import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Company } from "../entities/Company";

@Resolver(Company)
export class CompanyMutations {
  @Mutation(() => Company)
  async createCompany(
    @Arg("name") name: string,
    @Arg("address") address: string,
    @Arg("contactInfo") contactInfo: string,
  ): Promise<Company> {
    if (!name || !address || !contactInfo) {
      throw new GraphQLError("All fields are required", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    try {
      const newCompany = new Company(name, address, contactInfo);
      await dataSource.manager.save(newCompany);

      return newCompany;
    } catch (error) {
      // Si l’erreur est déjà un GraphQLError
      if (error instanceof GraphQLError) {
        throw error;
      }

      // Sinon, on l’enveloppe dans un message plus général
      throw new GraphQLError("Failed to create company", {
        extensions: {
          code: "CREATE_COMPAGNY_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Company)
  async updateCompany(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("address", { nullable: true }) address?: string,
    @Arg("contactInfo", { nullable: true }) contactInfo?: string,
  ): Promise<Company> {
    try {
      const company = await dataSource.manager.findOne(Company, {
        where: { id },
      });

      if (!company) {
        throw new GraphQLError(`Company with ID ${id} not found`, {
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
      throw new GraphQLError(`Company with ID ${id} not found`, {
        extensions: {
          code: "UPDATE_COMPAGNY_ERROR",
          originalError: err.message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteCompany(@Arg("id") id: number): Promise<boolean> {
    try {
      const company = await dataSource.manager.findOne(Company, {
        where: { id },
      });

      if (!company) {
        console.info(`no company found with is id: ${id}!!`);
        throw new GraphQLError(`Company with ID ${id} not found`, {
          extensions: { code: "COMPAGNY_NOT_FOUND" },
        });
      }

      await dataSource.manager.remove(company);
      return true;
    } catch (error) {
      const err = error as Error;
      throw new GraphQLError("Failed to delete company", {
        extensions: {
          code: "DELETE_COMPAGNY_ERROR",
          originalError: err.message || "Unknown error",
        },
      });
    }
  }
}
