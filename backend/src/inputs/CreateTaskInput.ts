import { InputType, Field } from "type-graphql";
import { TaskStatus } from "../enums/TaskStatus";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty({ message: "Task name is required." })
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  deliverableId!: number;
}
