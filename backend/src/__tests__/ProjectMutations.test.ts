import { Project } from "../entities/Project";
import { faker } from "@faker-js/faker";
import { ProjectMutations } from "../graphql-resolvers/ProjectMutations";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Project creation", () => {
	let projectMutations: ProjectMutations;
	let project: Project;

	beforeEach(() => {
		projectMutations = new ProjectMutations();

		project = new Project(
			faker.commerce.productName(),
			faker.person.fullName(),
			faker.lorem.sentence(),
			faker.date.past().toString(),
			faker.date.future().toString(),
		);
	});

	describe("create project", () => {
		it("should create a project ", async () => {
			mockTypeOrm().onMock(Project).toReturn(project, "save");
			console.info("project", project);
			const createdProject: Project = await projectMutations.createProject(
				project.name,
				project.author,
				project.description,
				project.startDate,
				project.endDate,
			);
			console.info("dans les tests, projet recupéré", createdProject);
			expect(createdProject).toMatchObject({
				name: project.name,
				author: project.author,
				description: project.description,
				startDate: project.startDate,
				endDate: project.endDate,
			});
		});
	});
});
