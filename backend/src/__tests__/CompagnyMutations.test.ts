import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../__tests_mockTypeorm-config";
import { Compagny } from "../entities/Compagny";
import { CompagnyMutations } from "../graphql-resolvers/CompagnyMutations";

describe("Compagny Mutations", () => {
  let compagnyMutations: CompagnyMutations;
  let compagny: Compagny;

  beforeEach(() => {
    compagnyMutations = new CompagnyMutations();
    compagny = new Compagny(
      faker.company.name(),
      faker.location.streetAddress(),
      faker.phone.number(),
    );
  });

  describe("createCompagny", () => {
    it("should create a new compagny", async () => {
      mockTypeOrm().onMock(Compagny).toReturn(compagny, "save");
      console.log("Mock configuré pour Compagny avec 'save'");

      const createdCompagny: Compagny = await compagnyMutations.createCompagny(
        compagny.name,
        compagny.address,
        compagny.contactInfo,
      );

      expect(createdCompagny).toMatchObject({
        name: compagny.name,
        address: compagny.address,
        contactInfo: compagny.contactInfo,
      });
    });
  });

  describe("updateCompagny", () => {
    it("should update an existing compagny", async () => {
      const mockCompany = new Compagny(
        faker.company.name(),
        faker.location.streetAddress(),
        faker.phone.number(),
      );
      mockCompany.id = 1;

      mockTypeOrm().onMock(Compagny).toReturn(mockCompany, "findOne");

      mockTypeOrm().onMock(Compagny).toReturn(mockCompany, "save");

      // Appeler la mutation updateCompagny
      const updatedCompany = await compagnyMutations.updateCompagny(
        mockCompany.id,
        "New Company Name",
        "New Address",
        "New Contact Info",
      );

      // Vérifier que les modifications ont été prises en compte
      expect(updatedCompany).toMatchObject({
        id: mockCompany.id,
        name: "New Company Name",
        address: "New Address",
        contactInfo: "New Contact Info",
      });
    });

    it("should return an error if the company does not exist", async () => {
      // Moquer `findOne()` pour retourner `undefined`
      mockTypeOrm().onMock(Compagny).toReturn(undefined, "findOne");

      // Vérifier que la mutation renvoie une erreur
      await expect(
        compagnyMutations.updateCompagny(
          999,
          "New Name",
          "New Address",
          "New Contact Info",
        ),
      ).rejects.toThrow("Compagny with ID 999 not found");
    });
  });
});
