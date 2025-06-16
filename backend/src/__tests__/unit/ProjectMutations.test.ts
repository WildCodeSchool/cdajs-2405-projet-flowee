import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import type { Project } from "../../entities/Project";
import { AccountStatus } from "../../enums/AccountStatus";
import { ProjectStatus } from "../../enums/ProjectStatus";
import { Role } from "../../enums/Role";
import { ProjectMutations } from "../../graphql-resolvers/ProjectMutations";
import type { CreateProjectInput } from "../../inputs/CreateProjectInput";
import type { MyContext } from "../../types/MyContext";
import { CompanyUser } from "../../entities/CompanyUser";
import { Account } from "../../entities/Account";
import { Client } from "../../entities/Client";
import { dataSource } from "../../dataSource/dataSource";

describe("Project creation", () => {
  let projectMutations: ProjectMutations;
  let validInput: CreateProjectInput;

  // Petite fonction utilitaire pour avoir des UUIDs propres
  const mockUuid = () => faker.string.uuid();

  beforeEach(() => {
    projectMutations = new ProjectMutations();

    validInput = {
      projectName: faker.commerce.productName(),
      clientEmail: faker.internet.email(),
      clientName: faker.person.fullName(),
      description: faker.lorem.sentence(),
      endDate: faker.date.future().toISOString(),
    };
    console.info("validInput", validInput);
  });

  describe("Success cases", () => {
    it("should create a project successfully", async () => {
      const userId = mockUuid();
      const companyUserId = mockUuid();
      const clientId = mockUuid();
      const projectId = mockUuid();

      const mockCompanyUser = {
        id: companyUserId,
        firstname: "Alice",
        lastname: "Durand",
        account: {
          id: userId,
        },
      };
      const mockAccount = {
        id: mockUuid(),
        email: validInput.clientEmail,
        role: Role.CLIENT,
        status: AccountStatus.ACTIVE,
      };

      const mockClient = {
        id: mockUuid(),
        clientName: validInput.clientName,
        status: AccountStatus.ACTIVE,
        account: mockAccount,
      };

      const savedProject = {
        id: projectId,
        projectName: validInput.projectName,
        description: validInput.description,
        startDate: new Date().toISOString(),
        endDate: validInput.endDate,
        status: ProjectStatus.NOT_STARTED,
        client: {
          id: clientId,
          clientName: validInput.clientName,
          email: validInput.clientEmail,
        },
        companyUserId,
      };

      const mockCtx: MyContext = {
        user: {
          id: userId,
          email: "admin@example.com",
          role: Role.ADMIN,
          password: "hashed",
          status: AccountStatus.ACTIVE,
        },
        redis: {
          del: jest.fn(),
          get: jest.fn(),
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any;

      mockTypeOrm().onMock(CompanyUser).toReturn(mockCompanyUser, "findOne");
      mockTypeOrm().onMock(Account).toReturn(mockAccount, "findOne");
      mockTypeOrm().onMock(Client).toReturn(mockClient, "findOne");
      jest
        .spyOn(dataSource, "transaction")
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        .mockImplementation(async (cb: any) => {
          return cb({
            findOne: jest
              .fn()
              .mockResolvedValueOnce(mockAccount) // 1er appel -> Account
              .mockResolvedValueOnce(mockClient), // 2e appel -> Client
            save: jest.fn().mockResolvedValue(savedProject),
            create: jest.fn().mockImplementation((_, obj) => obj),
          });
        });

      const createdProject: Project = await projectMutations.createProject(
        validInput,
        mockCtx,
      );

      expect(createdProject).toBeDefined();
      expect(createdProject.projectName).toBe(validInput.projectName);
      expect(createdProject.description).toBe(validInput.description);
      expect(createdProject.endDate).toBe(validInput.endDate);
      expect(createdProject.status).toBe(ProjectStatus.NOT_STARTED);
      expect(createdProject.client?.clientName).toBe(validInput.clientName);

      expect(createdProject.projectName).toBe(validInput.projectName);
      expect(createdProject.client?.clientName).toBe(validInput.clientName);
      expect(createdProject.status).toBe(ProjectStatus.NOT_STARTED);
    });
  });

  // describe("Validation errors", () => {
  //   it("should fail if clientEmail is missing", async () => {
  //     const input = { ...validInput, clientEmail: undefined as any };

  //     await expect(projectMutations.createProject(input)).rejects.toThrow(
  //       "Validation error",
  //     );
  //   });

  // it("should fail if projectName is missing", async () => {
  //   const input = { ...validInput, projectName: undefined as any };

  //   await expect(projectMutations.createProject(input)).rejects.toThrow(
  //     "Validation error",
  //   );
  // });

  // it("should fail if clientName is missing", async () => {
  //   const input = { ...validInput, clientName: undefined as any };

  //   await expect(projectMutations.createProject(input)).rejects.toThrow(
  //     "Validation error",
  //   );
  // });
});
