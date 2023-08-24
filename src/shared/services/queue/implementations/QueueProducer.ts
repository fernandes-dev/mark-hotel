import { IQueueProducer } from '../IQueueProducer'
import { BaseQueue } from './BaseQueue'

export class QueueProducer extends BaseQueue implements IQueueProducer {
  async send(message: string) {
    await this.connect()

    this.channel?.sendToQueue(this.queueName, Buffer.from(message))
  }
}
