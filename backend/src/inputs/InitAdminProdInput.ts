import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class InitAdminProdInput {
  @Field()
  @Length(5, 100)
  @IsNotEmpty()
  secret!: string;

  @Field()
  @Length(2)
  @IsNotEmpty()
  companyName!: string;

  @Field()
  companyAddress!: string;

  @Field()
  contactInfo!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @Length(6)
  @IsNotEmpty()
  password!: string;

  @Field()
  @IsNotEmpty()
  firstname!: string;

  @Field()
  @IsNotEmpty()
  lastname!: string;
}
