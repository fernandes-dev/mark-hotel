import { database } from '../../../../../shared/infra/database/prisma/database'
import { IDatabaseTransaction } from '../../IDatabaseTransaction'

export class DatabaseTransaction implements IDatabaseTransaction {
  private repository: typeof database

  constructor() {
    this.repository = database
  }

  async transaction(queries: unknown[]): Promise<void> {
    await this.repository.$transaction(async () => {
      await Promise.all(queries)
    })
  }
}
