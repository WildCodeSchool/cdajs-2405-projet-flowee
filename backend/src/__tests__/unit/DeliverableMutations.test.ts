import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Deliverable } from "../../entities/Deliverable";
import { DeliverableStatus } from "../../enums/DeliverableStatus";
import { DeliverableMutations } from "../../graphql-resolvers/DeliverableMutations";

describe("deliverable Mutations", () => {
  let deliverableMutations: DeliverableMutations;
  let deliverable: Deliverable;

  beforeEach(() => {
    deliverableMutations = new DeliverableMutations();

    deliverable = new Deliverable(
      faker.company.buzzAdjective(), // name
      faker.lorem.sentence(), // perimeter
      faker.date
        .future()
        .toISOString(), // date de livraison
      DeliverableStatus.IN_PROGRESS, // exemple de status
      faker.date
        .past()
        .toISOString(), // createAt
      faker.number.int({ min: 1, max: 5 }), // ReviewTimes
    );
  });

  describe("createDeliverable", () => {
    it("should create a new deliverable", async () => {
      mockTypeOrm().onMock(Deliverable).toReturn(deliverable, "save");

      const createdDeliverable: Deliverable =
        await deliverableMutations.createDeliverable(
          deliverable.name,
          deliverable.perimeter,
          deliverable.endDate,
          deliverable.status,
          deliverable.createdAt,
          deliverable.reviewTimes,
        );

      expect(createdDeliverable).toMatchObject({
        name: deliverable.name,
        perimeter: deliverable.perimeter,
        endDate: deliverable.endDate,
        status: deliverable.status,
        createdAt: deliverable.createdAt,
        reviewTimes: deliverable.reviewTimes,
      });
    });
  });
});
