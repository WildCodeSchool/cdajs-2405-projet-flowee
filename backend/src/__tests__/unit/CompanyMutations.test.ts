jest.mock("sib-api-v3-sdk", () => ({
  ApiClient: { instance: { authentications: { "api-key": {} } } },
  TransactionalEmailsApi: jest.fn().mockImplementation(() => ({
    sendTransacEmail: jest.fn().mockResolvedValue({}),
  })),
}));

import { faker } from "@faker-js/faker";
import { mockTypeOrm } from "../../__tests_mockTypeorm-config";
import { Company } from "../../entities/Company";
import { CompanyUser } from "../../entities/CompanyUser";
import { CompanyMutations } from "../../graphql-resolvers/CompanyMutations";

describe("Company Mutations", () => {
  let companyMutations: CompanyMutations;
  let company: Company;

  beforeEach(() => {
    companyMutations = new CompanyMutations();
    company = new Company(
      faker.company.name(),
      faker.location.streetAddress(),
      faker.phone.number(),
    );
  });

  describe("createCompany", () => {
    it("should create a new company", async () => {
      mockTypeOrm().onMock(Company).toReturn(company, "save");
      mockTypeOrm().onMock(CompanyUser).toReturn({ id: 456 }, "findOne");
      const createdCompany: Company = await companyMutations.createCompany(
        company.name,
        company.address,
        company.contactInfo,
      );

      expect(createdCompany).toMatchObject({
        name: company.name,
        address: company.address,
        contactInfo: company.contactInfo,
      });
    });
  });

  describe("updateCompany", () => {
    it("should update an existing company", async () => {
      const mockCompany = new Company(
        faker.company.name(),
        faker.location.streetAddress(),
        faker.phone.number(),
      );
      mockCompany.id = 1;

      mockTypeOrm().onMock(Company).toReturn(mockCompany, "findOne");

      mockTypeOrm().onMock(Company).toReturn(mockCompany, "save");

      // Appeler la mutation updateCompany
      const updatedCompany = await companyMutations.updateCompany(
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
      mockTypeOrm().onMock(Company).toReturn(undefined, "findOne");

      // Vérifier que la mutation renvoie une erreur
      await expect(
        companyMutations.updateCompany(
          999,
          "New Name",
          "New Address",
          "New Contact Info",
        ),
      ).rejects.toThrow("Company with ID 999 not found");
    });
  });
});
