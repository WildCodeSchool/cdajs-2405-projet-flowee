import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DeliverableStatus } from "../enums/DeliverableStatus";

@InputType()
export class CreateDeliverableInput {
  @Field()
  @IsNotEmpty({ message: "Deliverable name is required." })
  name!: string;

  @Field({ nullable: true })
  perimeter?: string;

  @Field({ nullable: true })
  deliveryDate?: string;

  @Field(() => DeliverableStatus, { nullable: true })
  status?: DeliverableStatus;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  reviewTimes?: number;
  @Field()
  projectId!: number;
}
