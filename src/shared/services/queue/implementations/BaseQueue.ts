import amqp from 'amqplib'

export class BaseQueue {
  public queue: typeof amqp

  public queuAddress =
    process.env.NODE_ENV === 'test'
      ? process.env.QUEUE_ADDRESS_LOCAL
      : process.env.QUEUE_ADDRESS

  public channel: amqp.Channel
  public queueName: string

  private MAX_RETRY_CONNECT = 5
  private RETRY_CONNECT = 0

  constructor(queueName: string) {
    this.queue = amqp
    this.queueName = queueName
  }

  async connect() {
    try {
      if (this.channel) return

      const connection = await this.queue.connect(this.queuAddress)

      const channel = await connection.createChannel()

      this.channel = channel

      this.channel.assertQueue(this.queueName, {
        durable: false,
      })
    } catch (error) {
      this.RETRY_CONNECT += 1

      if (this.RETRY_CONNECT >= this.MAX_RETRY_CONNECT) {
        console.log('error to connect queue, exiting...')

        throw new Error(error)
      }
      console.log('error to connect queue, retry...', this.RETRY_CONNECT)

      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(true)

          clearTimeout(timeout)
        }, 2000)
      })

      await this.connect()
    }
  }
}
