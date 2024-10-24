import { dataSource} from "../dataSource/dataSource"
import { Project } from "../entities/Project"
import { Mutation, Arg, InputType, Field, Resolver  } from "type-graphql"



// @InputType() 
// export class ProjectInput {

// 	@Field()
// 	name!: string;

// 	@Field({ nullable: true })
// 	author?: string;


// 	@Field({ nullable: true })
// 	description?: string;


// 	@Field((type) => Date)
// 	startDate?: Date;


// 	@Field((type) => Date)
// 	endDate?: Date;

// }

@Resolver(Project) 
export class ProjectMutations {

  @Mutation((_)=> Project)
  async createProject(@Arg("name") name:string ,@Arg("author") author:string , @Arg("description") description:string) : Promise<Project> {
    try {
      const newProject= new Project(name, author, description) ; 
      await newProject.save(); 
      console.info(newProject); 
  
      return newProject;
    } catch (error) {
      throw new Error("Invalid information")
    }
   

  }
}