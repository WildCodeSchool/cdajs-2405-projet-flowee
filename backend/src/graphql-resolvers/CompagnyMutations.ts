import { GraphQLError } from 'graphql';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { dataSource } from '../dataSource/dataSource';
import { Compagny } from '../entities/Compagny';

@Resolver(Compagny)
export class CompagnyMutations {
  @Mutation(() => Compagny)
  async createCompagny(
    @Arg('name') name: string,
    @Arg('address') address: string,
    @Arg('contactInfo') contactInfo: string
  ): Promise<Compagny> {
    if (!name || !address || !contactInfo) {
      throw new GraphQLError('All fields are required', {
        extensions: { code: 'VALIDATION_ERROR' },
      });
    }
    try {
      const newCompagny = new Compagny(name, address, contactInfo);
      await dataSource.manager.save(newCompagny);
      console.info(newCompagny);

      return newCompagny;
    } catch (error) {
      const err = error as Error;
      throw new GraphQLError('Failed to create compagny', {
        extensions: {
          code: 'CREATE_COMPAGNY_ERROR',
          originalError: err.message || 'Unknown error',
        },
      });
    }
  }
}
