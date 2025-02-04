import { Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Compagny } from "../entities/Compagny";

@Resolver(Compagny)
export class CompagnyQueries {
  @Query(() => [Compagny])
  async getAllCompanies(): Promise<Compagny[]> {
    const companies: Compagny[] = await dataSource.manager.find(Compagny);
    return companies;
  }
}
