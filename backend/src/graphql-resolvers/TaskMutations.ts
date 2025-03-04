import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { dataSource } from "../dataSource/dataSource";
import { Task } from "../entities/Task";
import type { Status } from "../enums/Status";

@Resolver(Task)
export class TaskMutations {
  @Mutation(() => Task)
  async createTask(
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("status", { nullable: true }) status?: Status,
    @Arg("startDate", { nullable: true }) startDate?: string,
    @Arg("endDate", { nullable: true }) endDate?: string
  ): Promise<Task> {
    if (!name) {
      throw new GraphQLError("Name is required", {
        extensions: { code: "VALIDATION_ERROR" },
      });
    }

    try {
      const newTask = new Task(name, description ?? "", startDate, endDate, status);
      await dataSource.manager.save(newTask);
      return newTask;
    } catch (error) {
      // Relancer l’erreur si c’est déjà un GraphQLError
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
    @Arg("status", { nullable: true }) status?: Status,
    @Arg("startDate", { nullable: true }) startDate?: string,
    @Arg("endDate", { nullable: true }) endDate?: string
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

  @Mutation(() => Task)
  async deleteTask(@Arg("id") id: number): Promise<Task> {
    try {
      const task = await dataSource.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new GraphQLError(`Task with ID ${id} not found`, {
          extensions: { code: "TASK_NOT_FOUND" },
        });
      }

      await dataSource.manager.remove(task);
      return task;
    } catch (error) {
      //Releve l erreur initiale si c'est une erreur GraphQLError
      if(error instanceof GraphQLError) {
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

