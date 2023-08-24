import { HotelAddressRepository } from '../../repositories/infra/prisma/HotelAddressRepository'
import { HotelsRepository } from '../../repositories/infra/prisma/HotelsRepository'
import { CreateHotelController } from './CreateHotelController'
import { CreateHotelUseCase } from './CreateHotelUseCase'

const hotelsRepository = new HotelsRepository()
const hotelAddressRepository = new HotelAddressRepository()

const createHotelUsecase = new CreateHotelUseCase(
  hotelsRepository,
  hotelAddressRepository
)

const createHotelController = new CreateHotelController(createHotelUsecase)

export { createHotelController }
