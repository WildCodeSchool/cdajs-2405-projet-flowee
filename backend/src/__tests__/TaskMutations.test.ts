import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Task } from "../entities/Task";
import { Status } from "../enums/Status";
import { TaskMutations } from "../graphql-resolvers/TaskMutations";

describe("Task Mutations", () => {
  let taskMutations: TaskMutations;
  let task: Task;

  beforeEach(() => {
    taskMutations = new TaskMutations();

    // Créer une instance fictive de Task (avec un Status fixe)
    task = new Task(
      faker.lorem.words(3),           // name
      faker.lorem.sentence(),         // description
      faker.date.past().toISOString(), // startDate (string)
      faker.date.future().toISOString(), // endDate (string)
      Status.IN_PROGRESS              // Status FIXE pour (tests déterministes)
    );

    // On peut aussi attribuer un ID fictif pour simuler un objet existant lors de l'update/delete
    // Mais on le fera dans les tests qui en ont besoin
  });

  
  // 1) Tests pour createTask

  describe("createTask", () => {
    it("should create a new task", async () => {
      // Moquer la méthode 'save' de la classe Task
      mockTypeOrm().onMock(Task).toReturn(task, "save");

      // Appel de la mutation createTask
      const createdTask = await taskMutations.createTask(
        task.name,
        task.description,
        task.status,
        task.startDate,
        task.endDate
      );

      // Vérifie que l'objet retourné match l'original
      expect(createdTask).toMatchObject({
        name: task.name,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
      });
    });

    it("should throw an error if something goes wrong (e.g. name is empty)", async () => {
      // Ici, on s'attend à ce que l'erreur levée soit "Invalid information"
      // car dans TaskMutations.ts, le catch jette "Invalid information"
      await expect(
        taskMutations.createTask(
          "", // name vide
          "Some description",
          Status.NOT_STARTED
          // startDate et endDate peuvent être omis
        )
      ).rejects.toThrow("Name is required");
    });
  });



  // 2) Tests pour updateTask

  describe("updateTask", () => {
    it("should update existing task", async () => {
      // Simule une Task
      const existingTask = new Task(
        "Old Name",
        "Old Description",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
        Status.NOT_STARTED
      );
      existingTask.id = 42; // ID fictif

      // Moquer 'findOne' pour retourner existingTask
      mockTypeOrm().onMock(Task).toReturn(existingTask, "findOne");

      // Moquer 'save' pour retourner la tâche mise à jour
      mockTypeOrm().onMock(Task).toReturn(existingTask, "save");

      // Appel de updateTask
      const updatedTask = await taskMutations.updateTask(
        existingTask.id!,
        "New Name",
        "New Description",
      );

      // Vérifier que la tâche a bien été mise à jour
      expect(updatedTask.name).toBe("New Name");
      expect(updatedTask.description).toBe("New Description");
      // Les autres champs restent inchangés
      expect(updatedTask.startDate).toBe(existingTask.startDate);
      expect(updatedTask.endDate).toBe(existingTask.endDate);
      expect(updatedTask.status).toBe(existingTask.status);
    });

    it("should throw 'Task with ID 999 not found' if task not found", async () => {
      // Simule un findOne qui renvoie undefined
      mockTypeOrm().onMock(Task).toReturn(undefined, "findOne");

      await expect(
        taskMutations.updateTask(999, "Name", "Description")
      ).rejects.toThrow("Task with ID 999 not found");
    });
  });

  //
  // 3) Tests pour deleteTask
  //
  describe("deleteTask", () => {
    it("should delete an existing task", async () => {
      // On simule une tache existante
      const existingTask = new Task(
        "Some Name",
        "Some Description",
        faker.date.past().toISOString(),
        faker.date.future().toISOString(),
        Status.BLOCKED
      );
      existingTask.id = 123;

      // Moquer 'findOne'
      mockTypeOrm().onMock(Task).toReturn(existingTask, "findOne");
      // Moquer 'remove' => renvoie la task supprimée
      mockTypeOrm().onMock(Task).toReturn(existingTask, "remove");

      // Appel de deleteTask
      const deletedTask = await taskMutations.deleteTask(existingTask.id);

      // Vérifier qu'on récupère la tache supprimée
      expect(deletedTask).toMatchObject({
        name: existingTask.name,
        description: existingTask.description,
        startDate: existingTask.startDate,
        endDate: existingTask.endDate,
        status: existingTask.status,
      });
    });

    it("should throw error if task not found", async () => {
      mockTypeOrm().onMock(Task).toReturn(undefined, "findOne");

      await expect(taskMutations.deleteTask(9999))
      .rejects.toThrow("Task with ID 9999 not found");
    });
  });
});
