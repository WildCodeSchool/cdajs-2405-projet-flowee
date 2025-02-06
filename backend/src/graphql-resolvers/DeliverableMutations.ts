import { dataSource } from "../dataSource/dataSource";
import { Task } from "../entities/Task";
import type { Status } from "../enums/Status";
import { Deliverable } from "../entities/Deliverable";
import { Mutation, Arg, Resolver } from "type-graphql";

@Resolver(Deliverable)
export class DeliverableMutations {
  @Mutation((_) => Deliverable)
  async createDeliverable(
    @Arg("name") name: string,
    @Arg("perimeter", { nullable: true }) perimeter?: string,
    @Arg("deliveryDate", { nullable: true }) deliveryDate?: string,
    @Arg("status", { nullable: true }) status?: Status,
    @Arg("createdAt", { nullable: true }) createdAt?: string,
    @Arg("reviewTimes", { nullable: true }) reviewTimes?: number,
  ): Promise<Deliverable> {
    try {
      const newDeliverable = new Deliverable(
        name,
        perimeter,
        deliveryDate,
        status,
        createdAt,
        reviewTimes,
      );
      await dataSource.manager.save(newDeliverable);
      return newDeliverable;
    } catch (error) {
      console.info(error);
      throw new Error("Invalid information");
    }
  }

  //update perimeter and or name
  @Mutation((_) => Deliverable)
  async updateDeliverable(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("perimeter") perimeter: string,
  ): Promise<Deliverable> {
    try {
      const deliverable = await dataSource.manager.findOne(Deliverable, {
        where: { id },
      });
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      deliverable.name = name;
      deliverable.perimeter = perimeter;

      await dataSource.manager.save(deliverable);

      return deliverable;
    } catch (error) {
      throw new Error("Invalid information");
    }
  }

  //delete deliverable from id
  @Mutation((_) => Deliverable)
  async deleteDeliverable(@Arg("id") id: number): Promise<Deliverable> {
    try {
      const deliverable = await dataSource.manager.findOne(Deliverable, {
        where: { id },
      });
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      // j'enleve les taches liées au livrable
      await dataSource.manager.delete(Task, { deliverable: { id } });

      // je supprime le livrable
      await dataSource.manager.remove(deliverable);

      return deliverable;
    } catch (error) {
      throw new Error("Invalid information");
    }
  }
}
