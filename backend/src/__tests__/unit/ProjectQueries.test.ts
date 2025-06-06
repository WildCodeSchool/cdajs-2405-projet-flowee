import { Project } from "../entities/Project";
import { faker } from "@faker-js/faker";
import { ProjectQueries } from "../graphql-resolvers/ProjectQueries";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Project Graphql queries", () => {
  let projectQueries: ProjectQueries;
  let projects: Project[];

  beforeEach(() => {
    projectQueries = new ProjectQueries();
    projects = Array.from({ length: 4 }).map(() => {
      return new Project(
        faker.commerce.productName(),
        faker.number.int({ min: 1, max: 1000 }),
        faker.lorem.sentence(),
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
      );
    });
  });

  describe("query all projects from TypeORM", () => {
    it("returns projects from TypeORM", async () => {
      mockTypeOrm().onMock(Project).toReturn(projects, "find");
      const retrievedProjects: Project[] =
        await projectQueries.getAllProjects();
      expect(retrievedProjects.length).toBe(projects.length);
      expect(retrievedProjects[0]).toHaveProperty("projectName");
      expect(retrievedProjects[0]).toHaveProperty("description");
      expect(retrievedProjects[0]).toHaveProperty("startDate");
      expect(retrievedProjects[0]).toHaveProperty("endDate");
      expect(retrievedProjects[0]).toHaveProperty("companyUserId");
    });
  });
});
