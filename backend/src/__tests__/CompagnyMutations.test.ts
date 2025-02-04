import { faker } from '@faker-js/faker';
import { mockTypeOrm } from '../__tests_mockTypeorm-config';
import { Compagny } from '../entities/Compagny';
import { CompagnyMutations } from '../graphql-resolvers/CompagnyMutations';

describe('Compagny Mutations', () => {
  let compagnyMutations: CompagnyMutations;
  let compagny: Compagny;


  beforeEach(() => {
    compagnyMutations = new CompagnyMutations();
    // console.log(compagnyMutations);

    compagny = new Compagny(
      faker.company.name(),
      faker.location.streetAddress(),
      faker.phone.number()
    );
  });

  describe('createCompagny', () => {
    it('should create a new compagny', async () => {
      mockTypeOrm().onMock(Compagny).toReturn(compagny, 'save');
      console.log("Mock configuré pour Compagny avec 'save'");

      const createdCompagny: Compagny = await compagnyMutations.createCompagny(
        compagny.name,
        compagny.address,
        compagny.contactInfo
      );

      expect(createdCompagny).toMatchObject({
        name: compagny.name,
        address: compagny.address,
        contactInfo: compagny.contactInfo,
      });
    });
  });
});
