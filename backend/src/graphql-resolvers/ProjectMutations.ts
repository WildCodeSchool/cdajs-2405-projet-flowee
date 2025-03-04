import { dataSource } from "../dataSource/dataSource";
import { GraphQLError } from "graphql";
import { Project } from "../entities/Project";
import { Mutation, Arg, Resolver } from "type-graphql";

@Resolver(Project)
export class ProjectMutations {
  @Mutation(() => Project)
  async createProject(
    @Arg("name") name: string,
    @Arg("author", { nullable: true }) author: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("startDate", { nullable: true }) startDate?: string,
    @Arg("endDate", { nullable: true }) endDate?: string
  ): Promise<Project> {
    try {
      const newProject = new Project(name, author, description, startDate, endDate);
      await dataSource.manager.save(newProject);
      return newProject;
    } catch (error) {
      // Relancer l’erreur si c’est déjà un GraphQLError
      if (error instanceof GraphQLError) {
        throw error;
      }

      // Sinon, envelopper l’erreur dans un message plus global
      throw new GraphQLError("Failed to create project", {
        extensions: {
          code: "CREATE_PROJECT_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }
}
