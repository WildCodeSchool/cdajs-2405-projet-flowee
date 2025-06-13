import { InputType, Field } from "type-graphql";
import { DeliverableStatus } from "../enums/DeliverableStatus";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateDeliverableInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  perimeter?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  deliveryDate?: string;

  @Field(() => DeliverableStatus, { nullable: true })
  @IsOptional()
  status?: DeliverableStatus;
  @Field({ nullable: true })
  @IsOptional()
  reviewTimes?: number;

  @Field({ nullable: true })
  @IsOptional()
  projectId?: number;
}
