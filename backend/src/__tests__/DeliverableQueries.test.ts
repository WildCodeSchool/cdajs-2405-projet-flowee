import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Deliverable } from "../entities/Deliverable";
import { DeliverableQueries } from "../graphql-resolvers/DeliverableQueries";
import { Status } from "../enums/Status";

describe("Deliverable Queries", () => {
  let deliverableQueries: DeliverableQueries;

  beforeEach(() => {
    deliverableQueries = new DeliverableQueries();
  });

  // 1) getAllDeliverables

  describe("getAllDeliverables", () => {
    it("should return an array of deliverables", async () => {
      // Préparation du tableau simulé
      const deliverables: Deliverable[] = [
        new Deliverable(
          faker.lorem.word(),          // name
          faker.lorem.sentence(),      // perimeter
          faker.date.future().toISOString(), // deliveryDate
           Status.IN_PROGRESS,               // status
          faker.date.past().toISOString(),   // createdAt
          faker.number.int({ min: 0, max: 3 }) // reviews
        ),
        new Deliverable(
          faker.lorem.word(),
          faker.lorem.sentence(),
          faker.date.future().toISOString(),
          Status.COMPLETED,
          faker.date.past().toISOString(),
          faker.number.int({ min: 0, max: 3 })
        ),
      ];

      // Mock la méthode 'find'
      mockTypeOrm().onMock(Deliverable).toReturn(deliverables, "find");

      const result = await deliverableQueries.getAllDeliverables();

      expect(result).toHaveLength(deliverables.length);
      expect(result[0].name).toBe(deliverables[0].name);
      expect(result[1].status).toBe(deliverables[1].status);
    });

    it("should return an empty array if no deliverables exist", async () => {
      // Simule la BDD vide
      mockTypeOrm().onMock(Deliverable).toReturn([], "find");

      const result = await deliverableQueries.getAllDeliverables();

      expect(result).toEqual([]);
    });
  });

  // 2) getDeliverable

  describe("getDeliverable", () => {
    it("should return a deliverable if found", async () => {
      // Création du deliverable
      const existingDeliverable = new Deliverable(
        faker.lorem.word(),
        faker.lorem.sentence(),
        faker.date.future().toISOString(),
        Status.IN_PROGRESS,
        faker.date.past().toISOString(),
        faker.number.int({ min: 0, max: 3 })
      );
      existingDeliverable.id = 42;

      mockTypeOrm().onMock(Deliverable).toReturn(existingDeliverable, "findOne");

      const result = await deliverableQueries.getDeliverable(42);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(42);
      expect(result?.name).toBe(existingDeliverable.name);
    });

    it("should return null if deliverable not found", async () => {
      // Mock 'findOne' pour qu'il renvoie null
      mockTypeOrm().onMock(Deliverable).toReturn(null, "findOne");

      const result = await deliverableQueries.getDeliverable(9999);

      expect(result).toBeNull();
    });
  });
});
