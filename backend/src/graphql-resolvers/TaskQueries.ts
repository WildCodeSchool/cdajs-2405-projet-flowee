import { Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Task)
export class TaskQueries {
  @Query((type) => [Task])
  async getAllTasks(): Promise<Task[]> {
    const tasks: Task[] = await dataSource.manager.find(Task);
    return tasks;
  }
}
