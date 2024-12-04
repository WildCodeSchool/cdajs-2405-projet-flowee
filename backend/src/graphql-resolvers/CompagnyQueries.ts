import { Query, Resolver } from "type-graphql";
import { Compagny } from "../entities/Compagny";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Compagny)
export class CompagnyQueries {
  @Query(() => [Compagny])
  async getAllCompanies(): Promise<Compagny[]> {
    const companies: Compagny[] = await dataSource.manager.find(Compagny);
    return companies;
  }
}
