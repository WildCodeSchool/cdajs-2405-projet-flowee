import { Query, Arg, Resolver, Authorized, Ctx } from "type-graphql";
import { ILike } from "typeorm";
import { Project } from "../entities/Project";
import { dataSource } from "../dataSource/dataSource";
import type { MyContext } from "../types/MyContext";

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
      relations: [
        "client",
        "deliverables",
        "deliverables.tasks",
        "companyUser",
      ],
    });

    if (!project?.client) {
      throw new Error("Client not found for this project");
    }
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
  @Authorized("CLIENT", "ADMIN") // Protège cette requête pour les utilisateurs connectés
  @Query(() => [Project])
  async getProjectsByUser(@Ctx() context: MyContext): Promise<Project[]> {
    const { user, redis } = context;

    if (!user) {
      throw new Error("Not connected");
    }

    const cacheKey = `user-projects:${user.role}:${user.id}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.info("Projets récupérés depuis le cache");
      return JSON.parse(cached);
    }
    console.log("🔄 [BBD] Projets récupérés depuis PostgreSQL");
    let projects: Project[] = [];

    if (user.role === "CLIENT") {
      projects = await dataSource.manager.find(Project, {
        where: {
          client: { account: { id: user.id } },
        },
        relations: ["client", "companyUser", "deliverables"],
      });
    } else if (user.role === "ADMIN") {
      projects = await dataSource.manager.find(Project, {
        where: {
          companyUser: { account: { id: user.id } },
        },
        relations: [
          "client",
          "companyUser",
          "deliverables",
          "deliverables.tasks",
        ],
      });
    } else {
      throw new Error("User role not supported");
    }

    // Stocker le résultat dans Redis pour 10 minutes
    await redis.set(cacheKey, JSON.stringify(projects), { EX: 600 });

    return projects;
  }
}
