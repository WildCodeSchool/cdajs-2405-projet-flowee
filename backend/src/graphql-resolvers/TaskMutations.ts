import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";
import { Task } from "../entities/Task";
import { Status } from "../enums/Status";
import { Mutation, Arg, InputType, Field, Resolver } from "type-graphql";

@Resolver(Task)
export class TaskMutations {
  @Mutation((_) => Task)
  async createTask(
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("status", { nullable: true }) status: Status = Status.NOT_STARTED,
    @Arg("startDate", { nullable: true }) startDate?: string,
    @Arg("endDate", { nullable: true }) endDate?: string,
  ): Promise<Task | undefined> {
    try {
      const newTask = new Task(name, description, startDate, endDate, status);

      // if (deliverableInput) {
      //   const deliverable = await dataSource.manager.findOne(Deliverable, {
      //     where: { id: deliverableInput.id },
      //   });

      // if (!deliverable) {
      //   throw new Error("Deliverable not found");
      // }
      // newTask.deliverable = deliverable;

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
    @Arg("description") description: string,
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
