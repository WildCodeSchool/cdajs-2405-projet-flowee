import { ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { CompanyUser } from "../entities/CompanyUser";
import { Project } from "../entities/Project";
import { AccountStatus } from "../enums/AccountStatus";
import { ClientStatus } from "../enums/ClientStatus";
import { ProjectStatus } from "../enums/ProjectStatus";
import { Role } from "../enums/Role";
import { CreateProjectInput } from "../inputs/CreateProjectInput";
import { UpdateProjectInput } from "../inputs/UpdateProjectInput";
import { sendActivationEmail } from "../services/sendActivationEmail";
import type { MyContext } from "../types/MyContext";
import { generateActivationToken } from "../utils/accesstoken";
import { invalidateCache } from "../utils/invalidatecache";

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

        // Case 1 : client exists but email not referring to any account
        if (!account && client) {
          console.warn(
            `[SECURITY] Un client avec ce nom (${clientName}) existe, mais l'email fourni (${clientEmail}) ne correspond à aucun compte.`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "CLIENTNAME_EXISTS_EMAIL_UNKNOWN" } },
          );
        }

        // Case 2 : Account exists but not client name
        if (account && !client) {
          console.warn(
            `[SECURITY] Un compte existe déjà avec cet email (${clientEmail}), mais le nom de client (${clientName}) ne correspond pas.`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "ACCOUNT_EXISTS_CLIENTNAME_MISMATCH" } },
          );
        }

        // Case 3 : Both client and account exists but does not match
        if (account && client && client.account?.id !== account.id) {
          console.warn(
            `[SECURITY] Incohérence : account (${clientEmail}) non lié à client (${clientName})`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "CLIENT_ACCOUNT_MISMATCH" } },
          );
        }

        // Case 4 : Both client and account exists, are linked ,but at least one status is not ACTIVE
        if (
          account &&
          client &&
          client.account?.id === account.id &&
          (account.status !== AccountStatus.ACTIVE ||
            client.status !== ClientStatus.ACTIVE)
        ) {
          console.warn(
            `[SECURITY] Refus projet : statut account=${account.status}, statut client=${client.status}`,
          );
          throw new GraphQLError(
            "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
            { extensions: { code: "STATUS_INVALID" } },
          );
        }

        // Case 5 : Both client and account exists, are linked statuts OK -> we create the project (no activation email)
        if (
          account &&
          client &&
          client.account?.id === account.id &&
          account.status === AccountStatus.ACTIVE &&
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
        // Cas 6 : nor client or account => we create both  and send activation email
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

          // Generate activation token
          const { token, expiresAt } = generateActivationToken(24);
          newAccount.activationToken = token;
          newAccount.tokenExpiresAt = expiresAt;
          await manager.save(Account, newAccount);

          return { newproject, account: newAccount, clientName, token };
        }

        // Catch all other unkonwn errors
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

    // Email sent after transaction if new account created
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
    console.info("Cache invalidated when creating projects");
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

  @Authorized("ADMIN")
  @Mutation(() => Project)
  async updateProject(
    @Arg("data", () => UpdateProjectInput) data: UpdateProjectInput,
    @Ctx() ctx: MyContext,
  ): Promise<Project> {
    const user = ctx.user;
    const project = await dataSource.manager.findOne(Project, {
      where: { id: data.id },
    });
    console.info("data dans back", data);
    console.info("projet dans back ", project);
    if (!project) {
      throw new Error("Unable to find the project");
    }
    if (data.name !== undefined) {
      project.projectName = data.name;
    }
    if (data.description !== undefined) {
      project.description = data.description;
    }
    if (data.endDate !== undefined) project.endDate = data.endDate;
    await dataSource.manager.save(project);

    if (user) {
      await invalidateCache(ctx.redis, user);
      console.info("Cache invalidated when updating project");
    }

    return project;
  }

  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async deleteProject(
    @Arg("projectId", () => Number) projectId: number,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const user = ctx.user;
    try {
      const project = await dataSource.manager.findOne(Project, {
        where: { id: projectId },
        relations: ["client", "client.account"],
      });

      if (!project) {
        throw new GraphQLError(`Project with ID ${projectId} not found`, {
          extensions: { code: "PROJECT_NOT_FOUND" },
        });
      }

      const client = project.client;
      console.info("client dans delete", client);

      if (!client) {
        throw new GraphQLError(
          `Le projet ${projectId} n'est associé à aucun client.`,
          {
            extensions: { code: "CLIENT_NOT_FOUND" },
          },
        );
      }

      await dataSource.manager.remove(project);

      // On check si le client a encore des projets ,
      // si non on passe le statut du client en INACTIVE et le account en INACTIVE
      const remainingProjects = await dataSource.manager.count(Project, {
        where: { client: { id: client.id } },
      });

      if (remainingProjects === 0) {
        client.status = ClientStatus.INACTIVE;

        if (client.account) {
          client.account.status = AccountStatus.INACTIVE;
          await dataSource.manager.save(client.account);
        }

        await dataSource.manager.save(client);
        console.info(`Client ${client.id} et son compte ont été désactivés`);
      }

      if (user) {
        await invalidateCache(ctx.redis, user);
        console.info(`Cache invalidated: projectsByUser:${user.id}`);
        const stillThere = await ctx.redis.get(`projectsByUser:${user.id}`);
        console.info("🚨 Redis after deletion:", stillThere);
      }

      return true;
    } catch (error) {
      throw new GraphQLError("Failed to delete project", {
        extensions: {
          code: "DELETE_PROJECT_ERROR",
          originalError: (error as Error).message || "Unknown error",
        },
      });
    }
  }
}
