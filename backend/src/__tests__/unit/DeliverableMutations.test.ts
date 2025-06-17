import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Deliverable } from "../../entities/Deliverable";
import { DeliverableStatus } from "../../enums/DeliverableStatus";
import { DeliverableMutations } from "../../graphql-resolvers/DeliverableMutations";
import type { MyContext } from "../../types/MyContext";
import type { CreateDeliverableInput } from "../../inputs/CreateDeliverableInput";
import { Role } from "../../enums/Role";
import { AccountStatus } from "../../enums/AccountStatus";
import { Project } from "../../entities/Project";
import { ProjectStatus } from "../../enums/ProjectStatus";

describe("deliverable Mutations", () => {
  let deliverableMutations: DeliverableMutations;
  let validDeliverableInput: CreateDeliverableInput;

  const mockUuid = () => faker.string.uuid();

  beforeEach(() => {
    deliverableMutations = new DeliverableMutations();

    validDeliverableInput = {
      name: faker.commerce.productName(),
      perimeter: faker.lorem.sentence(),
      deliveryDate: faker.date.future().toISOString(),
      status: DeliverableStatus.NOT_STARTED,
      createdAt: faker.date.past().toISOString(),
      reviewTimes: faker.number.int({ min: 1, max: 5 }),
      projectId: faker.number.int({ min: 1, max: 100 }),
    };
  });

  describe("createDeliverable", () => {
    it("should create a deliverable with valid data", async () => {
      const userId = mockUuid();

      const mockProject = {
        id: 1,
        projectName: "Project Alpha",
        companyUserId: userId,
        description: "A sample project for testing",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        status: ProjectStatus.IN_PROGRESS,
        client: {
          id: 1,
          clientName: "Client A",
          status: AccountStatus.ACTIVE,
        },
      };

      const mockDeliverable = {
        name: validDeliverableInput.name,
        perimeter: validDeliverableInput.perimeter,
        endDate: validDeliverableInput.deliveryDate,
        status: DeliverableStatus.NOT_STARTED,
        createdAt: validDeliverableInput.createdAt,
        reviewTimes: validDeliverableInput.reviewTimes,
        project: mockProject,
      };

      const mockCtx: MyContext = {
        user: {
          id: userId,
          email: "admin@example.com",
          role: Role.ADMIN,
          password: "hashed",
          status: AccountStatus.ACTIVE,
        },
      } as MyContext;

      const mock = mockTypeOrm();
      mock.onMock(Project).toReturn(mockProject, "findOne");
      mock.onMock(Deliverable).toReturn({ ...mockDeliverable, id: 10 }, "save");

      const result = await deliverableMutations.createDeliverable(
        {
          ...validDeliverableInput,
          projectId: mockProject.id,
        },
        mockCtx
      );

      expect(result).toMatchObject({
        name: mockDeliverable.name,
        perimeter: mockDeliverable.perimeter,
        endDate: mockDeliverable.endDate,
        status: mockDeliverable.status,
        createdAt: mockDeliverable.createdAt,
        reviewTimes: mockDeliverable.reviewTimes,
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
        1
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
        updatedDeliverable
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

  describe("deleteDeliverable", () => {
    it("should delete an existing deliverable", async () => {
      const existingDeliverable = new Deliverable(
        "Deliverable to delete",
        "Perimeter to delete",
        faker.date.future().toISOString(),
        DeliverableStatus.NOT_STARTED,
        "5"
      );
      existingDeliverable.id = 45;

      const mock = mockTypeOrm();
      mock
        .onMock(Deliverable)
        .toReturn({ id: existingDeliverable.id }, "findOne");
      mock.onMock(Deliverable).toReturn(undefined, "delete");

      const result = await deliverableMutations.deleteDeliverable(45);

      expect(result).toBe(true);
    });

    it("should throw an error if deliverable does not exist", async () => {
      const deliverableId = 789;

      const mock = mockTypeOrm();
      mock.onMock(Deliverable).toReturn(null, "findOne");
      await expect(
        deliverableMutations.deleteDeliverable(deliverableId)
      ).rejects.toThrow("Failed to delete deliverable");
    });
  });
});
