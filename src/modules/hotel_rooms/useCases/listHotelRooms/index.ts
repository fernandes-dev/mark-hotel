import { HotelRoomsRepository } from '../../repositories/infra/prisma/HotelRoomsRepository'
import { ListHotelRoomsController } from './ListHotelRoomsController'
import { ListHotelRoomsUseCase } from './ListHotelRoomsUseCase'

const hotelRoomsRepository = new HotelRoomsRepository()

const listHotelRoomsUseCase = new ListHotelRoomsUseCase(hotelRoomsRepository)

const listHotelRoomsController = new ListHotelRoomsController(
  listHotelRoomsUseCase
)

export { listHotelRoomsController }
