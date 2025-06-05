import { dataSource } from "../dataSource/dataSource";
import { GraphQLError } from "graphql";
import { Project } from "../entities/Project";
import { Client } from "../entities/Client";
import { Account } from "../entities/Account";
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
import { invalidateCache } from "../utils/invalidatecache";
import { ClientStatus } from "../enums/ClientStatus";

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
        const account = await manager.findOne(Account, {
          where: { email: clientEmail },
        });
        const client = await manager.findOne(Client, {
          where: { clientName },
          relations: ["account"],
        });

        // Cas : le client existe mais l'email ne correspond à aucun compte
        if (!account && client) {
          console.warn(
            `[SECURITY] Un client avec ce nom (${clientName}) existe, mais l'email fourni (${clientEmail}) ne correspond à aucun compte.`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "CLIENTNAME_EXISTS_EMAIL_UNKNOWN" } },
          );
        }

        // Cas : le compte existe mais pas le nom de client
        if (account && !client) {
          console.warn(
            `[SECURITY] Un compte existe déjà avec cet email (${clientEmail}), mais le nom de client (${clientName}) ne correspond pas.`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "ACCOUNT_EXISTS_CLIENTNAME_MISMATCH" } },
          );
        }

        // Cas : les deux existent mais ne sont pas liés
        if (account && client && client.account?.id !== account.id) {
          console.warn(
            `[SECURITY] Incohérence : account (${clientEmail}) non lié à client (${clientName})`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "CLIENT_ACCOUNT_MISMATCH" } },
          );
        }

        // Cas : les deux existent et sont liés mais client inactif
        if (
          account &&
          client &&
          client.account?.id === account.id &&
          client.status !== ClientStatus.ACTIVE
        ) {
          console.warn(
            `[SECURITY] Tentative création projet pour client inactif : ${clientName}, email : ${clientEmail}`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "CLIENT_NOT_ACTIVE" } },
          );
        }

        // Cas : les deux existent, sont liés, et client actif => création projet
        if (
          account &&
          client &&
          client.account?.id === account.id &&
          client.status === ClientStatus.ACTIVE
        ) {
          const newproject: Project = await manager.save(Project, {
            projectName,
            description,
            startDate,
            endDate,
            status: ProjectStatus.NOT_STARTED,
            client,
            companyUserId,
          });
          return { newproject, account, clientName, token: "" };
        }

        // Cas : ni client ni compte => on crée les deux
        if (!account && !client) {
          const newAccount = manager.create(Account, {
            email: clientEmail,
            password: "changeme",
            role: Role.CLIENT,
            status: AccountStatus.PENDING,
          });
          await manager.save(Account, newAccount);

          const newClient = manager.create(Client, {
            clientName,
            account: newAccount,
            status: ClientStatus.INACTIVE,
          });
          await manager.save(Client, newClient);

          const newproject: Project = await manager.save(Project, {
            projectName,
            description,
            startDate,
            endDate,
            status: ProjectStatus.NOT_STARTED,
            client: newClient,
            companyUserId,
          });

          // Générer token d’activation
          const { token, expiresAt } = generateActivationToken(24);
          newAccount.activationToken = token;
          newAccount.tokenExpiresAt = expiresAt;
          await manager.save(Account, newAccount);

          return { newproject, account: newAccount, clientName, token };
        }

        // Catch all
        throw new GraphQLError(
          "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
          { extensions: { code: "UNKNOWN_ERROR" } },
        );
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
      if (result.token) {
        await sendActivationEmail(
          result.account.email,
          result.clientName,
          result.token,
        );
      }
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
    // Invalidate cache
    await invalidateCache(ctx.redis, user);
    console.info("Cache invalidated for user projects");
    console.info("Project created successfully:", result.newproject);
    // Return the newly created project
    if (!result.newproject) {
      throw new GraphQLError("Project creation failed", {
        extensions: {
          code: "CREATE_PROJECT_FAILED",
          originalError: "No project was created",
        },
      });
    }

    return result.newproject;
  }
}
