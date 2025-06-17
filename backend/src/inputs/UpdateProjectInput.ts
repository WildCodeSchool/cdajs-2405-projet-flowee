import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateProjectInput {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  endDate?: string;
}
