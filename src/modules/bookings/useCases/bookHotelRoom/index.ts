import queueConfigs from '../../../../configs/queueConfigs'
import { QueueProducer } from '../../../../shared/services/queue/implementations/QueueProducer'
import { HotelRoomsRepository } from '../../../hotel_rooms/repositories/infra/prisma/HotelRoomsRepository'
import { HotelsRepository } from '../../../hotels/repositories/infra/prisma/HotelsRepository'
import { DatabaseTransaction } from '../../../shared/repositories/infra/prisma/DatabaseTransaction'
import { BookingsRepository } from '../../repositories/infra/prisma/BookingsRepository'
import { BookHotelRoomController } from './BookHotelRoomController'
import { BookHotelRoomUseCase } from './BookHotelRoomUseCase'

const hotelsRepository = new HotelsRepository()

const hotelRoomsRepository = new HotelRoomsRepository()
const bookingsRepository = new BookingsRepository()
const databaseTransaction = new DatabaseTransaction()

const bookHotelRoomUseCase = new BookHotelRoomUseCase(
  hotelsRepository,
  hotelRoomsRepository,
  bookingsRepository,
  databaseTransaction
)

const queueProducer = new QueueProducer(queueConfigs.queueName)

const bookHotelRoomController = new BookHotelRoomController(queueProducer)

export { bookHotelRoomUseCase, bookHotelRoomController }
