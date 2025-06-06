import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TrackerStats {
  @Field(() => Number, { nullable: true })
  lateProjects?: number;

  @Field(() => Number, { nullable: true })
  needReview: number;

  @Field(() => Number, { nullable: true })
  approvedDeliverables: number;

  constructor(
    needReview: number,
    approvedDeliverables: number,
    lateProjects?: number,
  ) {
    this.needReview = needReview;
    this.approvedDeliverables = approvedDeliverables;
    this.lateProjects = lateProjects;
  }
}
