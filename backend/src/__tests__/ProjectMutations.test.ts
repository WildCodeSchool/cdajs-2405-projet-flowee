import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Project } from "../entities/Project";
import { ProjectMutations } from "../graphql-resolvers/ProjectMutations";
import { ProjectStatus } from "../enums/ProjectStatus";
import type { CreateProjectInput } from "../inputs/CreateProjectInput";
import { AccountStatus } from "../enums/AccountStatus";
import { Role } from "../enums/Role";
import type { MyContext } from "../types/MyContext";
import { DeliverableStatus } from "../enums/DeliverableStatus";

describe("Project creation", () => {
  let projectMutations: ProjectMutations;
  let validInput: CreateProjectInput;

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
      const mockCtx = {
        user: {
          id: 123,
          email: "admin@example.com",
          role: Role.ADMIN,
          password: "test",
          status: AccountStatus.ACTIVE,
        },
      };

      const savedProject = {
        id: 1,
        projectName: validInput.projectName,
        description: validInput.description,
        startDate: new Date().toISOString(),
        endDate: validInput.endDate,
        status: DeliverableStatus.IN_PROGRESS,
        companyUserId: 123,
        client: {
          id: 1,
          name: validInput.clientName,
          email: validInput.clientEmail,
        },
      };

      mockTypeOrm().onMock(Project).toReturn(savedProject, "save");

      const createdProject: Project = await projectMutations.createProject(
        validInput,
        mockCtx as MyContext,
      );

      expect(createdProject).toEqual(expect.anything());
      console.log("Expected:", {
        projectName: validInput.projectName,
        description: validInput.description,
        endDate: validInput.endDate,
        status: ProjectStatus.IN_PROGRESS,
        client: {
          name: validInput.clientName,
          email: validInput.clientEmail,
        },
      });
      console.log("Received:", createdProject);

      expect(createdProject.startDate).toBeDefined();
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
