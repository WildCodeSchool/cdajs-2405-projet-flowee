import { Status } from "../entities/Task";
import { faker } from "@faker-js/faker";
import { Deliverable } from "../entities/Deliverable";
import { DeliverableQueries } from "../graphql-resolvers/DeliverableQueries";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Deliverable Graphql queries", () => {
  let deliverableQueries: DeliverableQueries;
  let deliverables: Deliverable[];

  beforeEach(() => {
    deliverableQueries = new DeliverableQueries();
    deliverables = [
      new Deliverable(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ]),
        faker.date.future()
      ),
      new Deliverable(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ]),
        faker.date.future()
      ),
      new Deliverable(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ]),
        faker.date.future()
      ),
      new Deliverable(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ]),
        faker.date.future()
      ),
    ];
  });

  describe("query all deliverables from TypeORM", () => {
    it("should return all deliverables", async () => {
      mockTypeOrm().onMock(Deliverable).toReturn(deliverables, "find");
      const allDeliverables: Deliverable[] =
        await deliverableQueries.getAllDeliverables();
      expect(allDeliverables).toMatchObject(deliverables);
    });
  });

  describe("query a deliverable by id from TypeORM", () => {
    it("should return a deliverable by id", async () => {
      const deliverable: Deliverable = deliverables[0];
      mockTypeOrm().onMock(Deliverable).toReturn(deliverable, "findOne");

      const retrievedDeliverable: Deliverable | null =
        await deliverableQueries.getDeliverable(deliverable.id!);
      expect(retrievedDeliverable).toMatchObject(deliverable);
    });
  });
});
