import { Arg, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Deliverable } from "../entities/Deliverable";

@Resolver(Deliverable)
export class DeliverableQueries {
  @Query(() => [Deliverable])
  async getAllDeliverables(): Promise<Deliverable[]> {
    const deliverable: Deliverable[] =
      await dataSource.manager.find(Deliverable);
    return deliverable;
  }

  @Query(() => Deliverable, { nullable: true })
  async getDeliverable(@Arg("id") id: number): Promise<Deliverable | null> {
    const deliverable: Deliverable | null = await dataSource.manager.findOne(
      Deliverable,
      {
        where: { id },
      },
    );
    return deliverable;
  }
}
