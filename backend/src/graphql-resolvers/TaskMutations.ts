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
      await newTask.save();
      console.info(newTask);

      return newTask;
    } catch (error) {
      throw new Error("Invalid information");
    }
  }
}
