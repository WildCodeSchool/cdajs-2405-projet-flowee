import { Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Company } from "../entities/Company";

@Resolver(Company)
export class CompanyQueries {
  @Query(() => [Company])
  async getAllCompanies(): Promise<Company[]> {
    const companies: Company[] = await dataSource.manager.find(Company);
    return companies;
  }
}
