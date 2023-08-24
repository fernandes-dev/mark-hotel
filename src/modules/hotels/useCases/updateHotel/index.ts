import { HotelAddressRepository } from '../../repositories/infra/prisma/HotelAddressRepository'
import { HotelsRepository } from '../../repositories/infra/prisma/HotelsRepository'
import { UpdateHotelController } from './UpdateHotelController'
import { UpdateHotelUseCase } from './UpdateHotelUseCase'

const hotelsRepository = new HotelsRepository()
const hotelAddressRepository = new HotelAddressRepository()

const createHotelUsecase = new UpdateHotelUseCase(
  hotelsRepository,
  hotelAddressRepository
)

const updateHotelController = new UpdateHotelController(createHotelUsecase)

export { updateHotelController }
