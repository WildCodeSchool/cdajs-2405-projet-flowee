import { Project } from "../entities/Project";
import { faker } from "@faker-js/faker";
import { ProjectQueries } from "../graphql-resolvers/ProjectQueries";
import { ProjectMutations } from "../graphql-resolvers/ProjectMutations";
import { MockTypeORM } from "mock-typeorm";

describe("Project Graphql queries", () => {
	let projectQueries: ProjectQueries;
	let projects: Project[];

	beforeEach(() => {
		projectQueries = new ProjectQueries();
		projects = [
			new Project(
				faker.commerce.productName(),
				faker.person.fullName(),
				faker.lorem.sentence(),
				faker.date.past(),
				faker.date.future(),
			),
			new Project(
				faker.commerce.productName(),
				faker.person.fullName(),
				faker.lorem.sentence(),
				faker.date.past(),
				faker.date.future(),
			),
			new Project(
				faker.commerce.productName(),
				faker.person.fullName(),
				faker.lorem.sentence(),
				faker.date.past(),
				faker.date.future(),
			),
			new Project(
				faker.commerce.productName(),
				faker.person.fullName(),
				faker.lorem.sentence(),
				faker.date.past(),
				faker.date.future(),
			),
		];
	});

	describe("query all projects from TypeORM", () => {
		it("returns projects from TypeORM", async () => {
			const typeORM = new MockTypeORM();
			typeORM.onMock(Project).toReturn(projects, "find");
			const retrievedProjects: Project[] =
				await projectQueries.getAllProjects();
			expect(retrievedProjects.length).toBe(projects.length);
			expect(retrievedProjects[0]).toHaveProperty("name");
			expect(retrievedProjects[0]).toHaveProperty("author");
			expect(retrievedProjects[0]).toHaveProperty("description");
			expect(retrievedProjects[0]).toHaveProperty("startDate");
			expect(retrievedProjects[0]).toHaveProperty("endDate");
		});
	});
});
