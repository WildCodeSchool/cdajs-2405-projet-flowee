import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty({ message: "Project Name is required" })
  projectName?: string;

  @Field()
  @IsEmail({}, { message: "Invalid format" })
  @IsNotEmpty({ message: "Client email is required" })
  clientEmail?: string;

  @Field()
  @IsNotEmpty({ message: "Client Name is required" })
  clientName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  endDate?: string;
}
