import { IsNotEmpty, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { TaskStatus } from "../enums/TaskStatus";

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  endDate?: string;

  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  status?: TaskStatus;

  @Field({ nullable: true })
  @IsOptional()
  deliverableId?: number;
}
