import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Task } from "../../entities/Task";
import { TaskStatus } from "../../enums/TaskStatus";
import { TaskMutations } from "../../graphql-resolvers/TaskMutations";
import type { CreateTaskInput } from "../../inputs/CreateTaskInput";
import { DeliverableStatus } from "../../enums/DeliverableStatus";
import { Deliverable } from "../../entities/Deliverable";
describe("Task Mutations", () => {
  let taskMutations: TaskMutations;
  let taskInput: CreateTaskInput;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    // Creation of a fake task with fixed status
    taskInput = {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      status: TaskStatus.IN_PROGRESS,
      deliverableId: faker.number.int({ min: 1, max: 100 }),
    };
  });

  // 1) Tests for createTask
  describe("createTask", () => {
    it("should create a new task", async () => {
      const mockDeliverable = {
        id: 1,
        name: faker.commerce.productName(),
        perimeter: faker.lorem.sentence(),
        endDate: faker.date.future().toISOString(),
        status: DeliverableStatus.NOT_STARTED,
        createdAt: faker.date.past().toISOString(),
        reviewTimes: faker.number.int({ min: 1, max: 5 }),
      };

      const mockTask = {
        name: taskInput.name,
        description: taskInput.description,
        startDate: taskInput.startDate,
        endDate: taskInput.endDate,
        status: taskInput.status,
        deliverable: mockDeliverable,
      };

      const mock = mockTypeOrm();
      mock.onMock(Deliverable).toReturn(mockDeliverable, "findOne");
      mock.onMock(Task).toReturn({ ...mockTask, id: 10 }, "save");

      const result = await taskMutations.createTask({
        ...taskInput,
        deliverableId: mockDeliverable.id,
      });

      expect(result).toMatchObject({
        name: mockTask.name,
        description: mockTask.description,
        startDate: mockTask.startDate,
        endDate: mockTask.endDate,
        status: mockTask.status,
      });
    });

    it("should throw an error if name is empty", async () => {
      const input: CreateTaskInput = {
        name: "",
        description: "Some description",
        status: TaskStatus.NOT_STARTED,
        deliverableId: faker.number.int(),
      };

      await expect(taskMutations.createTask(input)).rejects.toThrow(
        "Name is required"
      );
    });
  });

  // test to edit task

  describe("updateTask", () => {
    it("should update existing task", async () => {
      const existingTask = new Task(
        "Old Name",
        "Old Description",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
        TaskStatus.BLOCKED
      );
      existingTask.id = 123;

      const updatedTask = new Task(
        "New Name",
        "New Description",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
        TaskStatus.IN_PROGRESS
      );

      const mock = mockTypeOrm();
      mock.onMock(Task).toReturn(existingTask, "findOne");

      mock.onMock(Task).toReturn({ ...existingTask, updatedTask }, "save");

      const result = await taskMutations.updateTask(
        existingTask.id,
        updatedTask
      );
      expect(result).toMatchObject({
        id: existingTask.id,
        name: updatedTask.name,
        description: updatedTask.description,
        startDate: updatedTask.startDate,
        endDate: updatedTask.endDate,
        status: updatedTask.status,
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete an existing task", async () => {
      const existingTask = new Task(
        "Task to delete",
        "Description to delete",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
        TaskStatus.NOT_STARTED
      );
      existingTask.id = 45;

      const mock = mockTypeOrm();
      mock.onMock(Task).toReturn({ id: existingTask.id }, "findOne");
      mock.onMock(Task).toReturn(undefined, "delete");

      const result = await taskMutations.deleteTask(45);

      expect(result).toBe(true);
    });

    it("should throw an error if task does not exist", async () => {
      const taskId = 789;

      const mock = mockTypeOrm();
      mock.onMock(Task).toReturn(null, "findOne");
      await expect(taskMutations.deleteTask(taskId)).rejects.toThrow(
        "Failed to delete task"
      );
    });
  });
});
