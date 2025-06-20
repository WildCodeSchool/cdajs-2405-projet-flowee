import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { ILike } from "typeorm";
import { dataSource } from "../dataSource/dataSource";
import { Project } from "../entities/Project";
import type { MyContext } from "../types/MyContext";
import { GraphQLError } from "graphql";

@Resolver(Project)
export class ProjectQueries {
  @Query(() => [Project])
  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = await dataSource.manager.find(Project);
    return projects;
  }

  @Query(() => Project, { nullable: true })
  async getProjectById(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext
  ): Promise<Project | null> {
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

    if (
      ctx.user?.role === "CLIENT" &&
      project.client?.account?.id !== ctx.user.id
    ) {
      throw new GraphQLError("Forbidden", {
        extensions: { code: "FORBIDDEN" },
      });
    }
    return project;
  }

  @Query(() => [Project], { nullable: true })
  async getProjectsByName(
    @Arg("name") name: string
  ): Promise<Project[] | null> {
    const projects = await dataSource.manager.find(Project, {
      where: { projectName: ILike(`%${name}%`) },
    });

    return projects;
  }

  @Authorized("CLIENT", "ADMIN")
  @Query(() => [Project])
  async getProjectsByUser(@Ctx() context: MyContext): Promise<Project[]> {
    const { user, redis } = context;

    if (!user) {
      throw new Error("Not connected");
    }

    const cacheKey = `user-projects:${user.role}:${user.id}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.info("[CACHE] Projects retrieved from cache");
      return JSON.parse(cached);
    }
    console.log("[BDD] Projects retrieved from PostgreSQL");
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

    // Stock the result in Redis for 10 minutes to avoid requesting immediately
    await redis.set(cacheKey, JSON.stringify(projects), { EX: 600 });

    return projects;
  }
}
