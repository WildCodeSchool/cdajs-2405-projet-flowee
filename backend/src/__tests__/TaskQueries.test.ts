import { Task, Status } from "../entities/Task";
import { faker } from "@faker-js/faker";
import { TaskQueries } from "../graphql-resolvers/TaskQueries";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";

describe("Task Graphql queries", () => {
  let taskQueries: TaskQueries;
  let tasks: Task[];

  beforeEach(() => {
    taskQueries = new TaskQueries();
    tasks = [
      new Task(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.past(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ])
      ),
      new Task(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.past(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ])
      ),
      new Task(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.past(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ])
      ),
      new Task(
        faker.lorem.sentence(),
        faker.commerce.productDescription(),
        faker.date.past(),
        faker.date.future(),
        faker.helpers.arrayElement([
          Status.NOT_STARTED,
          Status.BLOCKED,
          Status.IN_PROGRESS,
          Status.COMPLETED,
        ])
      ),
    ];
  });

  describe("query all tasks from TypeORM", () => {
    it("returns tasks from TypeORM", async () => {
      mockTypeOrm().onMock(Task).toReturn(tasks, "find");
      const retrievedTasks: Task[] = await taskQueries.getAllTasks();
      expect(retrievedTasks.length).toBe(tasks.length);
      expect(retrievedTasks[0]).toHaveProperty("name");
      expect(retrievedTasks[0]).toHaveProperty("description");
      expect(retrievedTasks[0]).toHaveProperty("startDate");
      expect(retrievedTasks[0]).toHaveProperty("endDate");
      expect(retrievedTasks[0]).toHaveProperty("status");
    });
  });
});
