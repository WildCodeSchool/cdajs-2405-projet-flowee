import { MockTypeORM } from "mock-typeorm";
import type { EntityManager } from "typeorm";
import { dataSource } from "./dataSource/dataSource";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
if (!(global as any).mockTypeOrm) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (global as any).mockTypeOrm = new MockTypeORM();
}
export function mockTypeOrm(): MockTypeORM {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (global as any).mockTypeOrm;
}

beforeEach(() => {
  mockTypeOrm().resetAll();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (dataSource as any).transaction = <T>(
    callback: (entityManager: EntityManager) => Promise<T>,
  ) => {
    return callback(dataSource.manager);
  };
});
