import { IQueueConsumer } from '../IQueueConsumer'
import { BaseQueue } from './BaseQueue'

export class QueueConsumer extends BaseQueue implements IQueueConsumer {
  async consume(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queueCallback: (data: any) => Promise<void>
  ): Promise<void> {
    await this.connect()

    this.channel.consume(this.queueName, async (message) => {
      await queueCallback(JSON.parse(message.content.toString()))

      this.channel.ack(message)
    })
  }
}
