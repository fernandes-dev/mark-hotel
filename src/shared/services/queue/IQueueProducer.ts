export interface IQueueProducer {
  send(message: string): Promise<void>
}
