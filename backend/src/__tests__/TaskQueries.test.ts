import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Task } from "../entities/Task";
import { TaskQueries } from "../graphql-resolvers/TaskQueries";

describe("Task Queries", () => {
  let taskQueries: TaskQueries;

  beforeEach(() => {
    taskQueries = new TaskQueries();
  });

  // 1) getAllTasks

  describe("getAllTasks", () => {
    it("should return an array of tasks", async () => {
      // Préparation de taches fictives
      const tasks: Task[] = [
        new Task(
          faker.lorem.words(2),
          faker.lorem.sentence(),
          faker.date.past().toISOString(),
          faker.date.future().toISOString(),
        ),
        new Task(
          faker.lorem.words(2),
          faker.lorem.sentence(),
          faker.date.past().toISOString(),
          faker.date.future().toISOString(),
        ),
      ];

      // Mock la méthode 'find' de TypeORM
      mockTypeOrm().onMock(Task).toReturn(tasks, "find");

      const result = await taskQueries.getAllTasks();

      expect(result).toHaveLength(tasks.length);
      expect(result[0].name).toBe(tasks[0].name);
      expect(result[1].description).toBe(tasks[1].description);
    });

    it("should return an empty array if no tasks exist", async () => {
      // Simulation d'une bdd vide
      mockTypeOrm().onMock(Task).toReturn([], "find");

      const result = await taskQueries.getAllTasks();

      expect(result).toEqual([]);
    });
  });

  // 2) getTask

  describe("getTask", () => {
    it("should return a single task if found", async () => {
      const existingTask = new Task(
        "Existing Task",
        "Some description",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
      );
      existingTask.id = 42;

      // Mock 'findOne' et renvoi la tache
      mockTypeOrm().onMock(Task).toReturn(existingTask, "findOne");

      const result = await taskQueries.getTask(42);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(42);
      expect(result?.name).toBe("Existing Task");
    });

    it("should return null if task not found", async () => {
      // findOne renvoie null ou undefined
      mockTypeOrm().onMock(Task).toReturn(null, "findOne");

      const result = await taskQueries.getTask(9999);

      expect(result).toBeNull();
    });
  });
});
