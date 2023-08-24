import { IDatabaseTransaction } from '../IDatabaseTransaction'

export class DatabaseTransactionInMemory implements IDatabaseTransaction {
  async transaction(queries: unknown[]): Promise<void> {
    await Promise.all(queries)
  }
}
