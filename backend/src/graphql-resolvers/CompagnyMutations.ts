import { dataSource } from '../dataSource/dataSource';
import { Compagny } from '../entities/Compagny';
import { Mutation, Arg, Resolver } from 'type-graphql';

@Resolver(Compagny)
export class CompagnyMutations {
  @Mutation(() => Compagny)
  async createCompagny(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('contactInfo') contactInfo: string
  ): Promise<Compagny> {
    try {
      const newCompagny = new Compagny(name, address, contactInfo);
      await newCompagny.save();
      console.info(newCompagny);

      return newCompagny;
    } catch (error) {
      throw new Error('Invalid information');
    }
  }
}
