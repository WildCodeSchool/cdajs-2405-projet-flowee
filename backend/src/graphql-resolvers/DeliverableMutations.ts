import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";
import { Task } from "../entities/Task";
import type { Status } from "../enums/Status";

@Resolver(Deliverable)
export class DeliverableMutations {
  @Mutation((_) => Deliverable)
  async createDeliverable(
    @Arg("name") name: string,
    @Arg("perimeter", { nullable: true }) perimeter?: string,
    @Arg("deliveryDate", { nullable: true }) deliveryDate?: string,
    @Arg("status", { nullable: true }) status?: Status,
    @Arg("createdAt", { nullable: true }) createdAt?: string,
    @Arg("reviewTimes", { nullable: true }) reviewTimes?: number,
  ): Promise<Deliverable> {
    if (!name) {
      throw new GraphQLError("Name is required", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }
    try {
      const newDeliverable = new Deliverable(
        name,
        perimeter,
        deliveryDate,
        status,
        createdAt,
        reviewTimes,
      );
      await dataSource.manager.save(newDeliverable);
      console.info("Deliverable created:", newDeliverable);
      return newDeliverable;
    } catch (error) {
       if (error instanceof GraphQLError) {
      throw error;
    }
      throw new GraphQLError("Failed to create deliverable", {
        extensions: {
          code: "CREATE_DELIVERABLE_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }

  //update perimeter and or name
  @Mutation((_) => Deliverable)
  async updateDeliverable(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("perimeter", { nullable: true }) perimeter?: string,
  ): Promise<Deliverable> {
    try {
      const deliverable = await dataSource.manager.findOne(Deliverable, {
        where: { id },
      });
      if (!deliverable) {
        throw new GraphQLError(`Deliverable with ID ${id} not found`, {
          extensions: { code: "DELIVERABLE_NOT_FOUND" },
        });
      }

      if (name) deliverable.name = name;
      if (perimeter) deliverable.perimeter = perimeter;

      await dataSource.manager.save(deliverable);
      console.info("Deliverable updated:", deliverable);
      return deliverable;
    } catch (error) {
      throw new GraphQLError("Failed to update deliverable", {
        extensions: {
          code: "UPDATE_DELIVERABLE_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }

  //delete deliverable from id
  @Mutation(() => Boolean)
  async deleteDeliverable(@Arg("id") id: number): Promise<boolean> {
    try {
      const deliverable = await dataSource.manager.findOne(Deliverable, {
        where: { id },
      });

      if (!deliverable) {
        throw new GraphQLError(`Deliverable with ID ${id} not found`, {
          extensions: { code: "DELIVERABLE_NOT_FOUND" },
        });
      }

      // j'enleve les taches liées au livrable
      await dataSource.manager.delete(Task, { deliverable: { id } });

      // je supprime le livrable
      await dataSource.manager.remove(deliverable);
       console.info(`Deliverable with ID ${id} deleted`);

      return true;
    } catch (error) {
      throw new GraphQLError("Failed to delete deliverable", {
        extensions: {
          code: "DELETE_DELIVERABLE_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }
}
