import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { dataSource } from "../dataSource/dataSource";
import { Task } from "../entities/Task";

import type { TaskStatus } from "../enums/TaskStatus";
import { CreateTaskInput } from "../inputs/CreateTaskInput";
import { Deliverable } from "../entities/Deliverable";

@Resolver(Task)
export class TaskMutations {
  @Authorized("ADMIN")
  @Mutation(() => Task)
  async createTask(
    @Arg("newTask", () => CreateTaskInput)
    newTaskInput: CreateTaskInput,
  ): Promise<Task> {
    const { name, description, startDate, endDate, status, deliverableId } =
      newTaskInput;

    try {
      const deliverable = await dataSource.manager.findOneByOrFail(
        Deliverable,
        {
          id: deliverableId,
        },
      );

      const newTask = new Task(
        name,
        description ?? "",
        startDate,
        endDate,
        status,
      );

      newTask.deliverable = deliverable;

      await dataSource.manager.save(newTask);
      return newTask;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError("Failed to create task", {
        extensions: {
          code: "CREATE_TASK_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Task)
  async updateTask(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("status", { nullable: true }) status?: TaskStatus,
    @Arg("startDate", { nullable: true }) startDate?: string,
    @Arg("endDate", { nullable: true }) endDate?: string,
  ): Promise<Task> {
    try {
      const task = await dataSource.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new GraphQLError(`Task with ID ${id} not found`, {
          extensions: { code: "TASK_NOT_FOUND" },
        });
      }

      if (name) task.name = name;
      if (description) task.description = description;
      if (status) task.status = status;
      if (startDate) task.startDate = startDate;
      if (endDate) task.endDate = endDate;

      await dataSource.manager.save(task);
      return task;
    } catch (error) {
      // Si l’erreur est déjà une GraphQLError,
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Failed to update task", {
        extensions: {
          code: "UPDATE_TASK_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("id") id: number): Promise<boolean> {
    try {
      const task = await dataSource.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new GraphQLError(`Task with ID ${id} not found`, {
          extensions: { code: "TASK_NOT_FOUND" },
        });
      }

      await dataSource.manager.remove(task);
      return true;
    } catch (error) {
      //Releve l erreur initiale si c'est une erreur GraphQLError
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError("Failed to delete task", {
        extensions: {
          code: "DELETE_TASK_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }
}
