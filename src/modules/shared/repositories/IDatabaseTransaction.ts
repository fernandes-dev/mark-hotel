export interface IDatabaseTransaction {
  transaction(queries: unknown[]): Promise<void>
}
