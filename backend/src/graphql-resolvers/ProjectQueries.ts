import { Query, Arg, Resolver, Authorized, Ctx } from "type-graphql";
import { ILike } from "typeorm";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";
import { MyContext } from "../types/MyContext";
import { Client } from "../entities/Client";

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
      where: { projectName: ILike(`%${name}%`) },
    });

    return projects;
  }

  // Query qui récupère l'utilisateur connecté et renvoie ses projets
  @Authorized("ADMIN") // Protège cette requête pour les utilisateurs connectés
  @Query(() => [Project])
  async getProjectsByUser(@Ctx() context: MyContext): Promise<Project[]> {
    const user = context.user;
    console.info("USER DANS QUERY PROJECT", context);

    if (!user) {
      throw new Error("Not connected");
    }

    const client = await dataSource.manager.findOne(Client, {
      where: {
        account: { id: user.id },
      },
    });

    if (!client) {
      throw new Error("Nothing to retreive");
    }

    return client.projects ?? [];
  }
}
