import { Query, Arg, Resolver } from "type-graphql";
import { ILike } from "typeorm";
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

  @Query(() => [Project], { nullable: true })
  async getProjectsByName(
    @Arg("name") name: string,
  ): Promise<Project[] | null> {
    const projects = await dataSource.manager.find(Project, {
      where: { name: ILike(`%${name}%`) },
    });

    return projects;
  }
}
