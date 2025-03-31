import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty({ message: "Le nom du projet est requis." })
  projectName?: string;

  @Field()
  @IsEmail({}, { message: "Format d'email invalide." })
  @IsNotEmpty({ message: "L'email du client est requis." })
  clientEmail?: string;

  @Field()
  @IsNotEmpty({ message: "Le nom du client est requis." })
  clientName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  endDate?: string;
}
