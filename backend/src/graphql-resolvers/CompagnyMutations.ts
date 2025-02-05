import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Compagny } from "../entities/Compagny";

@Resolver(Compagny)
export class CompagnyMutations {
  @Mutation(() => Compagny)
  async createCompagny(
    @Arg("name") name: string,
    @Arg("address") address: string,
    @Arg("contactInfo") contactInfo: string
  ): Promise<Compagny> {
    if (!name || !address || !contactInfo) {
      throw new GraphQLError("All fields are required", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    try {
      const newCompagny = new Compagny(name, address, contactInfo);
      await dataSource.manager.save(newCompagny);
      console.info(newCompagny);

      return newCompagny;
    } catch (error) {
      const err = error as Error;
      throw new GraphQLError("Failed to create compagny", {
        extensions: {
          code: "CREATE_COMPAGNY_ERROR",
          originalError: err.message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Compagny)
  async updateCompagny(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("address", { nullable: true }) address?: string,
    @Arg("contactInfo", { nullable: true }) contactInfo?: string
  ): Promise<Compagny> {
    try {
      const company = await dataSource.manager.findOne(Compagny, { where: { id } });

      if (!company) {
        throw new GraphQLError(`Compagny with ID ${id} not found`, {
          extensions: { code: "COMPAGNY_NOT_FOUND" },
        });
      }

      if (name) company.name = name;
      if (address) company.address = address;
      if (contactInfo) company.contactInfo = contactInfo;

      await dataSource.manager.save(company);
      return company;
    } catch (error) {
      const err = error as Error;
      throw new GraphQLError(`Compagny with ID ${id} not found`, {
        extensions: {
          code: "UPDATE_COMPAGNY_ERROR",
          originalError: err.message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteCompagny(@Arg("id") id: number): Promise<boolean> {
    try {
      const company = await dataSource.manager.findOne(Compagny, { where: { id } });

      if (!company) {
        console.log(`no company found with is id: ${id}!!`);
        throw new GraphQLError(`Compagny with ID ${id} not found`, {
          extensions: { code: "COMPAGNY_NOT_FOUND" },
        });
      }

      await dataSource.manager.remove(company);
      return true;
    } catch (error) {
      const err = error as Error;
      throw new GraphQLError("Failed to delete compagny", {
        extensions: {
          code: "DELETE_COMPAGNY_ERROR",
          originalError: err.message || "Unknown error",
        },
      });
    }
  }
}
