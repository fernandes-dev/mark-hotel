import { HotelsRepository } from '../../../hotels/repositories/infra/prisma/HotelsRepository'
import { HotelRoomsRepository } from '../../repositories/infra/prisma/HotelRoomsRepository'
import { CreateHotelRoomController } from './CreateHotelRoomController'
import { CreateHotelRoomUseCase } from './CreateHotelRoomUseCase'

const hotelRoomsRepository = new HotelRoomsRepository()
const hotelsRepository = new HotelsRepository()

const createHotelRoomUseCase = new CreateHotelRoomUseCase(
  hotelRoomsRepository,
  hotelsRepository
)

const createHotelRoomController = new CreateHotelRoomController(
  createHotelRoomUseCase
)

export { createHotelRoomController }
