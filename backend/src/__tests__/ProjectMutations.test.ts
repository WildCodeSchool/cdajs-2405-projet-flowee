import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Project } from "../entities/Project";
import { ProjectMutations } from "../graphql-resolvers/ProjectMutations";
import { Status } from "../enums/Status";

describe("Project creation", () => {
  let projectMutations: ProjectMutations;
  let project: Project;
  // let mockCtx: any;

  beforeEach(() => {
    projectMutations = new ProjectMutations();

    // mockCtx = { user: { id: faker.number.int({ min: 1, max: 1000 }) } };

    project = new Project(
      faker.commerce.productName(),
      faker.internet.email(),
      2,
      faker.lorem.sentence(),
      new Date().toISOString(), // startDate
      faker.date.future().toISOString(),
      Status.NOT_STARTED,
    );
  });

  describe("create project", () => {
    it("should create a project ", async () => {
      mockTypeOrm().onMock(Project).toReturn(project, "save");
      const createdProject: Project = await projectMutations.createProject(
        project.name,
        project.clientEmail,
        project.description,
        project.endDate,
      );
      expect(createdProject).toMatchObject({
        name: project.name,
        clientEmail: project.clientEmail,
        companyUserId: project.companyUserId,
        description: project.description,
        startDate: expect.any(String),
        endDate: project.endDate,
        status: project.status,
      });
    });

    it("should fail if clientEmail is missing", async () => {
      await expect(
        projectMutations.createProject(
          project.name,
          "",
          project.description,
          project.endDate,
        ),
      ).rejects.toThrow("Validation error");
    });

    it("should fail if no name is provided", async () => {
      await expect(
        projectMutations.createProject(
          "",
          project.clientEmail,
          project.description,
          project.endDate,
        ),
      ).rejects.toThrow("Validation error");
    });
  });
});
