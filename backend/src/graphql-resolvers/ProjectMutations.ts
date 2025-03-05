import { dataSource } from "../dataSource/dataSource";
import { GraphQLError } from "graphql";
import { Project } from "../entities/Project";
import { Mutation, Arg, Resolver } from "type-graphql";
// import { Validate } from "class-validator";
// import { Status } from "../enums/Status";

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
      const companyUserId = 2; // pour le moment en dur et ensuite sera récupéré du contexte

      const startDate = new Date().toISOString();

      const newProject = new Project(
        name,
        clientEmail,
        companyUserId,
        description,
        startDate,
        endDate,
      );

      // //valider les champs
      // const errors = await Validate(newProject);
      // if (errors.length > 0) {
      //   console.error("Validation failed. Errors:", errors);
      //   throw new GraphQLError("Validation error", {
      //     extensions: { code: "VALIDATION_ERROR", details: errors },
      //   });
      // }

      await dataSource.manager.save(newProject);
      return newProject;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
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
