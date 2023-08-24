export interface IQueueConsumer {
  consume(
    queueCallback: (data: Record<string, unknown>) => Promise<void>
  ): Promise<void>
}
