import { Query, Resolver } from "type-graphql";
import { Project } from "../src/entities/Project";

import { dataSource } from "../src/dataSource/dataSource";

@Resolver(Project)
export class AdQueries {
	@Query((type) => [Project])
	async getAllAds(): Promise<Project[]> {
		const projects: Project[] = await dataSource.manager.find(Project);
		return projects;
	}
}
