import { dataSource } from "../dataSource/dataSource";
import { GraphQLError } from "graphql";
import { Project } from "../entities/Project";
import { Client } from "../entities/Client";
import { Account } from "../entities/Account";
// import { CompanyUser } from "../entities/CompanyUser";
import { CreateProjectInput } from "../inputs/CreateProjectInput";
import { ProjectStatus } from "../enums/ProjectStatus";
import { Role } from "../enums/Role";
import { AccountStatus } from "../enums/AccountStatus";
import { Mutation, Arg, Resolver, Authorized, Ctx } from "type-graphql";
import { ValidationError } from "class-validator";
import type { MyContext } from "../types/MyContext";
import { CompanyUser } from "../entities/CompanyUser";

@Resolver(Project)
export class ProjectMutations {
  @Authorized("ADMIN")
  @Mutation(() => Project)
  async createProject(
    @Arg("newProject", () => CreateProjectInput) newProject: CreateProjectInput,
    @Ctx() ctx: MyContext,
  ): Promise<Project> {
    try {
      const user = ctx.user;

      if (!user || user.role !== Role.ADMIN) {
        throw new GraphQLError("Unauthorized  : admin required", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const companyUser = await dataSource.manager.findOne(CompanyUser, {
        where: { account: { id: user.id } },
      });

      if (!companyUser) {
        throw new GraphQLError("Unauthorized : user not registered", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const companyUserId = companyUser.id;

      const startDate = new Date().toISOString();

      const { projectName, clientEmail, clientName, description, endDate } =
        newProject;

      if (!companyUserId) {
        throw new Error("User not connected");
      }

      //  Step 1 : account creation
      let account: Account | null = await dataSource.manager.findOne(Account, {
        where: { email: clientEmail },
      });

      if (!account) {
        account = dataSource.manager.create(Account, {
          email: clientEmail,
          password: "changeme", // ENVOYER UN MAIL OU TOKEN POUR LA MISE A JOUR
          role: Role.CLIENT,
          status: AccountStatus.PENDING,
        });
        await dataSource.manager.save(Account, account);
      }

      //STep 2 : Verify client or create client

      let client = await dataSource.manager.findOne(Client, {
        where: { account: { id: account?.id } },
        relations: ["account"],
      });

      if (!client) {
        client = dataSource.manager.create(Client, {
          clientName: clientName,
          account,
        });
        await dataSource.manager.save(Client, client);
      }

      const newproject: Project = await dataSource.manager.save(Project, {
        projectName: projectName,
        description,
        startDate,
        endDate,
        status: ProjectStatus.NOT_STARTED,
        client,
        companyUserId,
      });

      return newproject;
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
