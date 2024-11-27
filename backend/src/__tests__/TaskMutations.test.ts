import { Task, TaskStatus } from "../entities/Task";
import { de, faker } from "@faker-js/faker";
import { TaskMutations } from "../graphql-resolvers/TaskMutations";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Task creation", () => {
  let taskMutations: TaskMutations;
  let task: Task;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    task = new Task(
      faker.commerce.productName(),
      faker.lorem.sentence(),
      faker.date.past(),
      faker.date.future(),
      faker.helpers.arrayElement([
        TaskStatus.PENDING,
        TaskStatus.IN_PROGRESS,
        TaskStatus.COMPLETED,
      ])
    );
  });

  describe("create task", () => {
    it("should create a task ", async () => {
      mockTypeOrm().onMock(Task).toReturn(task, "save");
      console.info("task", task);

      const createdTask: Task = await taskMutations.createTask(
        task.name,
        task.description || ""
      );

      console.info("dans les tests, tache recupérée", createdTask);
      expect(createdTask).toMatchObject({
        name: task.name,
        description: task.description,
      });
    });
  });
});

describe("Task update", () => {
  let taskMutations: TaskMutations;
  let task: Task;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    task = new Task(
      faker.commerce.productName(),
      faker.lorem.sentence(),
      faker.date.past(),
      faker.date.future(),
      faker.helpers.arrayElement([
        TaskStatus.PENDING,
        TaskStatus.IN_PROGRESS,
        TaskStatus.COMPLETED,
      ])
    );
    task.id = faker.number.int();
  });

  describe("update task", () => {
    it("should update a task ", async () => {
      mockTypeOrm().onMock(Task).toReturn(task, "findOne");
      mockTypeOrm().onMock(Task).toReturn(task, "save");

      const updatedTask: Task = await taskMutations.updateTask(
        task.id!,
        task.name,
        task.description || ""
      );

      expect(updatedTask).toMatchObject({
        name: task.name,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
      });
    });
  });
});

describe("Task deletion", () => {
  let taskMutations: TaskMutations;
  let task: Task;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    task = new Task(
      faker.commerce.productName(),
      faker.lorem.sentence(),
      faker.date.past(),
      faker.date.future(),
      faker.helpers.arrayElement([
        TaskStatus.PENDING,
        TaskStatus.IN_PROGRESS,
        TaskStatus.COMPLETED,
      ])
    );
    task.id = faker.number.int();
  });

  describe("delete task", () => {
    it("should delete a task ", async () => {
      mockTypeOrm().onMock(Task).toReturn(task, "findOne");
      mockTypeOrm().onMock(Task).toReturn(task, "remove");

      const deletedTask: Task = await taskMutations.deleteTask(task.id!);

      expect(deletedTask).toMatchObject({
        name: task.name,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
      });
    });
  });
});
