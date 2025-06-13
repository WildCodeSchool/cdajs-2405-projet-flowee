import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Deliverable } from "../../entities/Deliverable";
import { DeliverableStatus } from "../../enums/DeliverableStatus";
import { DeliverableMutations } from "../../graphql-resolvers/DeliverableMutations";
import type { MyContext } from "../../types/MyContext";

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

      const input = {
        name: deliverable.name,
        perimeter: deliverable.perimeter,
        deliveryDate: deliverable.endDate,
        status: deliverable.status,
        createdAt: deliverable.createdAt,
        reviewTimes: deliverable.reviewTimes,
        projectId: faker.number.int(),
      };

      const mockCtx = {
        user: {
          role: "ADMIN",
        },
      } as MyContext;

      const createdDeliverable = await deliverableMutations.createDeliverable(
        input,
        mockCtx,
      );

      expect(createdDeliverable).toMatchObject({
        name: input.name,
        perimeter: input.perimeter,
        deliveryDate: input.deliveryDate,
        status: input.status,
        createdAt: input.createdAt,
        reviewTimes: input.reviewTimes,
      });
    });
  });

  describe("updateDeliverable", () => {
    it("should update an existing deliverable", async () => {
      const existingDeliverable = new Deliverable(
        "Old name",
        "Old perimeter",
        "2025-12-01",
        DeliverableStatus.NOT_STARTED,
        "2025-01-01",
        1,
      );
      existingDeliverable.id = 123;

      const updatedDeliverable = {
        name: "New name",
        perimeter: "New perimeter",
        deliveryDate: "2025-12-31",
        status: DeliverableStatus.APPROVED,
        reviewTime: 3,
      };

      const mock = mockTypeOrm();
      mock.onMock(Deliverable).toReturn(existingDeliverable, "findOne");

      mock
        .onMock(Deliverable)
        .toReturn({ ...existingDeliverable, ...updatedDeliverable }, "save");

      const result = await deliverableMutations.updateDeliverable(
        existingDeliverable.id,
        updatedDeliverable,
      );

      expect(result).toMatchObject({
        id: 123,
        name: updatedDeliverable.name,
        perimeter: updatedDeliverable.perimeter,
        deliveryDate: updatedDeliverable.deliveryDate,
        status: updatedDeliverable.status,
        reviewTime: updatedDeliverable.reviewTime,
      });
    });
  });
});
