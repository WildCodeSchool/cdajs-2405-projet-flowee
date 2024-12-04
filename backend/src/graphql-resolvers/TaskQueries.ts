import { Arg, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Task)
export class TaskQueries {
  @Query((type) => [Task])
  async getAllTasks(): Promise<Task[]> {
    const tasks: Task[] = await dataSource.manager.find(Task);
    return tasks;
  }

  @Query((type) => Task, { nullable: true })
  async getTask(@Arg("id") id: number): Promise<Task | null> {
    const task: Task | null = await dataSource.manager.findOne(Task, {
      where: { id },
    });
    return task;
  }

  // @Query((type) => [Task])
  // getTasksBydeliverableId(@Arg("deliverableId") deliverableId: number): Promise<Task[]> {
  //   return dataSource.manager.find(Task, { where: { deliverableId } });
  // }
}
