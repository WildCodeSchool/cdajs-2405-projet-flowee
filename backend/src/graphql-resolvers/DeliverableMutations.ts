import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";
import { Task } from "../entities/Task";

import { CreateDeliverableInput } from "../inputs/CreateDeliverableInput";
import type { MyContext } from "../types/MyContext";
import { Project } from "../entities/Project";

@Resolver(Deliverable)
export class DeliverableMutations {
  @Authorized("ADMIN")
  @Mutation((_) => Deliverable)
  async createDeliverable(
    @Arg("newDeliverable", () => CreateDeliverableInput)
    newDeliverableInput: CreateDeliverableInput,
    @Ctx() ctx: MyContext,
  ): Promise<Deliverable> {
    const user = ctx.user;

    if (!user || user.role !== "ADMIN") {
      throw new GraphQLError("Unauthorized : admin required", {
        extensions: { code: "FORBIDDEN" },
      });
    }
    const {
      name,
      perimeter,
      deliveryDate,
      status,
      createdAt,
      reviewTimes,
      projectId,
    } = newDeliverableInput;

    try {
      const project = await dataSource.manager.findOne(Project, {
        where: { id: projectId },
      });
      if (!project) {
        throw new GraphQLError("Project not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const deliverable = new Deliverable(
        name,
        perimeter,
        deliveryDate,
        status,
        createdAt,
        reviewTimes,
      );

      deliverable.project = project;

      await dataSource.manager.save(deliverable);

      return deliverable;
    } catch (error) {
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
