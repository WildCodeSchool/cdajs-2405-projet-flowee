import { Arg, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Task } from "../entities/Task";

@Resolver(Task)
export class TaskQueries {
  @Query(() => [Task])
  async getAllTasks(): Promise<Task[]> {
    const tasks: Task[] = await dataSource.manager.find(Task);
    return tasks;
  }

  @Query(() => Task, { nullable: true })
  async getTask(@Arg("id") id: number): Promise<Task | null> {
    const task: Task | null = await dataSource.manager.findOne(Task, {
      where: { id },
      relations: ["deliverable"],
    });
    return task;
  }

  // @Query((type) => [Task])
  // getTasksBydeliverableId(@Arg("deliverableId") deliverableId: number): Promise<Task[]> {
  //   return dataSource.manager.find(Task, { where: { deliverableId } });
  // }
}
