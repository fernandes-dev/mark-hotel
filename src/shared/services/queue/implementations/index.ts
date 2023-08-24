import queueConfigs from '../../../../configs/queueConfigs'
import { bookHotelRoomUseCase } from '../../../../modules/bookings/useCases/bookHotelRoom'
import { IBookHotelRoomData } from '../../../../modules/bookings/useCases/bookHotelRoom/BookHotelRoomUseCase'
import { AppError } from '../../../errors/AppError'
import { QueueConsumer } from './QueueConsumer'

async function startQueue() {
  const queueConsumer = new QueueConsumer(queueConfigs.queueName)

  await queueConsumer.consume(async (data: IBookHotelRoomData) => {
    try {
      await bookHotelRoomUseCase.execute(data)
    } catch (error) {
      if (error instanceof AppError) return console.log(error)

      console.log(error)
    }
  })

  if (process.env.NODE_ENV !== 'test')
    console.log(`🚥 queue: ${queueConfigs.queueName} started`)
}

export { startQueue }
