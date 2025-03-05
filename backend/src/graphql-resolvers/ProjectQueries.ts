import { Query, Arg, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Project)
export class ProjectQueries {
  @Query(() => [Project])
  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = await dataSource.manager.find(Project);
    return projects;
  }

  @Query(() => Project, { nullable: true })
  async getProjectById(@Arg("id") id: number): Promise<Project | null> {
    const project: Project | null = await dataSource.manager.findOne(Project, {
      where: { id },
    });
    return project;
  }
}

// @Query(() => Task, { nullable: true })
// async getTask(@Arg("id") id: number): Promise<Task | null> {
//   const task: Task | null = await dataSource.manager.findOne(Task, {
//     where: { id },
//   });
//   return task;
// }
