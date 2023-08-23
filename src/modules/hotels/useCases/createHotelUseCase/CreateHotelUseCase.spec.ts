import { HotelAddressRepositoryInMemory } from '../../repositories/in-memory/HotelAddressRepositoryInMemory'
import { HotelsRepositoryInMemory } from '../../repositories/in-memory/HotelsRepositoryInMemory'
import { CreateHotelUseCase } from './CreateHotelUseCase'

describe('create hotel use case', () => {
  let createHotelUseCase: CreateHotelUseCase

  let hotelsRepositoryInMemory: HotelsRepositoryInMemory
  let hotelAddressRepositoryInMemory: HotelAddressRepositoryInMemory

  beforeEach(() => {
    hotelsRepositoryInMemory = new HotelsRepositoryInMemory()
    hotelAddressRepositoryInMemory = new HotelAddressRepositoryInMemory()

    createHotelUseCase = new CreateHotelUseCase(
      hotelsRepositoryInMemory,
      hotelAddressRepositoryInMemory
    )
  })

  it(' should be able to create a hotel and address', async () => {
    const data = {
      address: {
        country: 'Brazil',
        street: '25 de Março',
        zipcode: '00000-000',
      },
      name: 'Mark Hotel',
      rooms_available: 10,
      rooms_booked: 5,
    }

    const result = await createHotelUseCase.execute(data)

    expect(result.hotel.id).toBeDefined()
    expect(result.hotel_address.id).toBeDefined()
  })
})
