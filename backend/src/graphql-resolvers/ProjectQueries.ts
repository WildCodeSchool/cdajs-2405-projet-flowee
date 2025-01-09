import { Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Project)
export class ProjectQueries {
  @Query((type) => [Project])
  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = await dataSource.manager.find(Project);
    return projects;
  }
}
