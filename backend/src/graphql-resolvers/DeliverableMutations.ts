import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";
import { Task } from "../entities/Task";

import { Project } from "../entities/Project";
import { CreateDeliverableInput } from "../inputs/CreateDeliverableInput";
import { UpdateDeliverableInput } from "../inputs/UpdateDeliverableInput";
import type { MyContext } from "../types/MyContext";

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
    @Arg("data", () => UpdateDeliverableInput) data: UpdateDeliverableInput,
  ): Promise<Deliverable> {
    const deliverable = await dataSource.manager.findOne(Deliverable, {
      where: { id },
    });

    if (!deliverable) {
      throw new GraphQLError(`Deliverable with ID ${id} not found`, {
        extensions: { code: "DELIVERABLE_NOT_FOUND" },
      });
    }

    Object.assign(deliverable, data);

    try {
      await dataSource.manager.save(deliverable);
      return deliverable;
    } catch (error) {
      throw new GraphQLError("Failed to update deliverable", {
        extensions: {
          code: "UPDATE_DELIVERABLE_ERROR",
          originalError: (error as Error).message,
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

      //remove all tasks associated with the deliverable
      await dataSource.manager.delete(Task, { deliverable: { id } });

      // Delete the deliverable
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
