import { Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Project)
export class ProjectQueries {
  @Query(() => [Project])
  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = await dataSource.manager.find(Project, {
      relations: ["client"],
    });
    return projects;
  }
}
