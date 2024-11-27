import { dataSource } from "../dataSource/dataSource";
import { Task, TaskStatus } from "../entities/Task";
import { Mutation, Arg, InputType, Field, Resolver } from "type-graphql";

@Resolver(Task)
export class TaskMutations {
  @Mutation((_) => Task)
  async createTask(
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<Task> {
    try {
      const newTask = new Task(name, description);

      await dataSource.manager.save(newTask);

      return newTask;
    } catch (error) {
      console.info(error);
      throw new Error("Invalid information");
    }
  }

  @Mutation((_) => Task)
  async updateTask(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<Task> {
    try {
      const task = await dataSource.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new Error("Task not found");
      }

      task.name = name;
      task.description = description;

      await dataSource.manager.save(task);

      return task;
    } catch (error) {
      throw new Error("Invalid information");
    }
  }

  @Mutation((_) => Task)
  async deleteTask(@Arg("id") id: number): Promise<Task> {
    try {
      const task = await dataSource.manager.findOne(Task, { where: { id } });
      if (!task) {
        throw new Error("Task not found");
      }

      await dataSource.manager.remove(task);

      return task;
    } catch (error) {
      throw new Error("Invalid information");
    }
  }
}
