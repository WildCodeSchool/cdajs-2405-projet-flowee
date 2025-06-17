import { GraphQLError } from "graphql";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";
import { Task } from "../entities/Task";
import { CreateTaskInput } from "../inputs/CreateTaskInput";
import { UpdateTaskInput } from "../inputs/UpdateTaskInput";

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
    if (!name || name.trim() === "") {
      throw new GraphQLError("Name is required", {
        extensions: { code: "TASK_VALIDATION_ERROR" },
      });
    }
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

  @Authorized("ADMIN")
  @Mutation(() => Task)
  async updateTask(
    @Arg("id") id: number,
    @Arg("data", () => UpdateTaskInput) data: UpdateTaskInput,
  ): Promise<Task> {
    const task = await dataSource.manager.findOne(Task, { where: { id } });
    if (!task) {
      throw new GraphQLError(`Task with ID ${id} not found`, {
        extensions: { code: "TASK_NOT_FOUND" },
      });
    }

    Object.assign(task, data);
    try {
      await dataSource.manager.save(task);
      return task;
    } catch (error) {
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
