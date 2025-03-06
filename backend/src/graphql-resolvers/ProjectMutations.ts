import { dataSource } from "../dataSource/dataSource";
import { GraphQLError } from "graphql";
import { Project } from "../entities/Project";
import { Mutation, Arg, Resolver } from "type-graphql";
import { validateOrReject, ValidationError } from "class-validator";

@Resolver(Project)
export class ProjectMutations {
  @Mutation(() => Project)
  async createProject(
    @Arg("name", { nullable: false }) name: string,
    @Arg("clientEmail", { nullable: false }) clientEmail: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("endDate", { nullable: true }) endDate?: string,
  ): Promise<Project> {
    try {
      const companyUserId = 2; // pour le moment en dur et ensuite sera récupéré du contexte Ctx

      const startDate = new Date().toISOString();

      const newProject = new Project(
        name,
        clientEmail,
        companyUserId,
        description,
        startDate,
        endDate,
      );

      await validateOrReject(newProject);

      console.log("Avant sauvegarde:", newProject);

      const newProjectCreated = await dataSource.manager.save(newProject);

      console.info(newProjectCreated);

      return newProjectCreated;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      if (Array.isArray(error) && error[0] instanceof ValidationError) {
        throw new GraphQLError("Validation error", {
          extensions: {
            code: "VALIDATION_ERROR",
            errors: error.flatMap((err) =>
              Object.values(err.constraints || {}),
            ),
          },
        });
      }

      throw new GraphQLError("Failed to create project", {
        extensions: {
          code: "CREATE_PROJECT_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }
}
