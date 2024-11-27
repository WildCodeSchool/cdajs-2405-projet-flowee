import { Arg, Query, Resolver } from "type-graphql";
import { Deliverable } from "../entities/Deliverable";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Deliverable)
export class DeliverableQueries {
  @Query((type) => [Deliverable])
  async getAllDeliverables(): Promise<Deliverable[]> {
    const deliverable: Deliverable[] = await dataSource.manager.find(
      Deliverable
    );
    return deliverable;
  }

  @Query((type) => Deliverable, { nullable: true })
  async getDeliverable(@Arg("id") id: number): Promise<Deliverable | null> {
    const deliverable: Deliverable | null = await dataSource.manager.findOne(
      Deliverable,
      {
        where: { id },
      }
    );
    return deliverable;
  }
}
