import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";
import { TaskStatus } from "../enums/TaskStatus";

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
