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
import { generateActivationToken } from "../utils/accesstoken";
import { sendActivationEmail } from "../services/sendActivationEmail";

@Resolver(Project)
export class ProjectMutations {
  @Authorized("ADMIN")
  @Mutation(() => Project)
  async createProject(
    @Arg("newProject", () => CreateProjectInput) newProject: CreateProjectInput,
    @Ctx() ctx: MyContext,
  ): Promise<Project> {
    const user = ctx.user;

    if (!user || user.role !== Role.ADMIN) {
      throw new GraphQLError("Unauthorized : admin required", {
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

    let result: {
      newproject: Project;
      account: Account;
      clientName?: string;
      token: string;
    };

    // Transaction
    try {
      result = await dataSource.transaction(async (manager) => {
        let account: Account | null = await manager.findOne(Account, {
          where: { email: clientEmail },
        });

        if (!account) {
          account = manager.create(Account, {
            email: clientEmail,
            password: "changeme",
            role: Role.CLIENT,
            status: AccountStatus.PENDING,
          });
          await manager.save(Account, account);
        }

        const existingClient = await manager.findOne(Client, {
          where: { account: { id: account?.id } },
          relations: ["account"],
        });

        if (existingClient) {
          throw new GraphQLError("A client already exists for this account", {
            extensions: { code: "CLIENT_ALREADY_EXISTS" },
          });
        }

        const client = manager.create(Client, {
          clientName,
          account,
          accountId: account.id,
        });
        await manager.save(Client, client);

        const newproject: Project = await manager.save(Project, {
          projectName,
          description,
          startDate,
          endDate,
          status: ProjectStatus.NOT_STARTED,
          client,
          companyUserId,
        });

        const { token, expiresAt } = generateActivationToken(24);
        account.activationToken = token;
        account.tokenExpiresAt = expiresAt;
        await manager.save(Account, account);

        return { newproject, account, clientName, token };
      });
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

    // Envoi du mail après transaction
    try {
      await sendActivationEmail(
        result.account.email,
        result.clientName,
        result.token,
      );
    } catch (err) {
      console.error("Erreur lors de l'envoi du mail :", err);
      throw new GraphQLError(
        "Project created but failed to send activation email",
        {
          extensions: {
            code: "EMAIL_SEND_ERROR",
            originalError: (err as Error).message || "Unknown email error",
          },
        },
      );
    }

    return result.newproject;
  }
}
