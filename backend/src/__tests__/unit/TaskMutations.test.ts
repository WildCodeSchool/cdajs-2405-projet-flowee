import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Task } from "../../entities/Task";
import { TaskStatus } from "../../enums/TaskStatus";
import { TaskMutations } from "../../graphql-resolvers/TaskMutations";
import type { CreateTaskInput } from "../../inputs/CreateTaskInput";

describe("Task Mutations", () => {
  let taskMutations: TaskMutations;
  let task: Task;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    // Créer une instance fictive de Task (avec un Status fixe)
    task = new Task(
      faker.lorem.words(3), // name
      faker.lorem.sentence(), // description
      faker.date.past().toISOString(), // startDate (string)
      faker.date.future().toISOString(), // endDate (string)
      TaskStatus.IN_PROGRESS // Status FIXE pour (tests déterministes)
    );
  });

  // 1) Tests pour createTask
  describe("createTask", () => {
    it("should create a new task", async () => {
      mockTypeOrm().onMock(Task).toReturn(task, "save");

      const input: CreateTaskInput = {
        name: task.name,
        description: task.description,
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate,
        deliverableId: faker.number.int(),
      };

      const createdTask = await taskMutations.createTask(input);

      expect(createdTask).toMatchObject({
        name: task.name,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
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
});
