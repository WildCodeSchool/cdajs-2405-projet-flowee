import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Deliverable } from "../entities/Deliverable";
import { DeliverableMutations } from "../graphql-resolvers/DeliverableMutations";
import { Status } from "../enums/Status";

describe("deliverable Mutations", () => {
  let deliverableMutations: DeliverableMutations;
  let deliverable: Deliverable;

  beforeEach(() => {
    deliverableMutations = new DeliverableMutations();

    deliverable = new Deliverable(
      faker.company.buzzAdjective(),      // name
      faker.lorem.sentence(),             // perimeter
      faker.date
        .future()
        .toISOString(),                    // date de livraison
      Status.IN_PROGRESS,                // exemple de status
      faker.date
        .past()
        .toISOString(),                     // createAt
      faker.number.int({ min: 1, max: 5 }), // ReviewTimes
    );
  });

describe("createDeliverable", () => {
    it("should create a new deliverable", async () => {
      mockTypeOrm().onMock(Deliverable).toReturn(deliverable, "save");
      console.log("Mock configuré pour Deliverable avec 'save'");

      const createdDeliverable: Deliverable = await deliverableMutations.createDeliverable(
        deliverable.name,
        deliverable.perimeter,
        deliverable.deliveryDate,
        deliverable.status,
        deliverable.createdAt,
        deliverable.reviewTimes
      );

      expect(createdDeliverable).toMatchObject({
        name: deliverable.name,
        perimeter: deliverable.perimeter,
        deliveryDate: deliverable.deliveryDate,
        status: deliverable.status,
        createdAt: deliverable.createdAt,
        reviewTimes: deliverable.reviewTimes
      });
    });
  });
});
