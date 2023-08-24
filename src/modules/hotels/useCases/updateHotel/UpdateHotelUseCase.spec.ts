import { randomUUID } from 'crypto'

import { Hotel } from '../../entities/Hotel'
import { HotelAddress } from '../../entities/HotelAdress'
import { HotelAddressRepositoryInMemory } from '../../repositories/in-memory/HotelAddressRepositoryInMemory'
import { HotelsRepositoryInMemory } from '../../repositories/in-memory/HotelsRepositoryInMemory'
import { UpdateHotelUseCase } from './UpdateHotelUseCase'

describe('update hotel use case', () => {
  let updateHotelUseCase: UpdateHotelUseCase

  let hotelsRepositoryInMemory: HotelsRepositoryInMemory
  let hotelAddressRepositoryInMemory: HotelAddressRepositoryInMemory

  let hotel: Hotel
  let hotelAddress: HotelAddress

  beforeEach(async () => {
    hotelsRepositoryInMemory = new HotelsRepositoryInMemory()
    hotelAddressRepositoryInMemory = new HotelAddressRepositoryInMemory()

    updateHotelUseCase = new UpdateHotelUseCase(
      hotelsRepositoryInMemory,
      hotelAddressRepositoryInMemory
    )

    hotel = await hotelsRepositoryInMemory.create({
      name: `mark hotel ${randomUUID()}`,
      rooms_available: Math.floor(Math.random() * (100 - 1 + 1) + 1),
      rooms_booked: Math.floor(Math.random() * (100 - 1 + 1) + 1),
    })

    hotelAddress = await hotelAddressRepositoryInMemory.create({
      country: 'Brazil',
      hotel_id: hotel.id,
      street: '25 de Março',
      zipcode: '00000-000',
    })
  })

  it(' should be able to update a hotel and address', async () => {
    const data = {
      address: {
        street: '25 de Março 2',
        zipcode: '00000-000 2',
      },
      name: 'Mark Hotel test',
      rooms_booked: 5,
      id: hotel.id,
    }

    const result = await updateHotelUseCase.execute(data)

    expect(result.hotel.id).toBe(hotel.id)
    expect(result.hotel_address.country).toBe(hotelAddress.country)
    expect(result.hotel_address.street).not.toBe(hotelAddress.street)
    expect(result.hotel_address.zipcode).not.toBe(hotelAddress.zipcode)
    expect(result.hotel_address.zipcode).toBe(data.address.zipcode)
    expect(result.hotel_address.street).toBe(data.address.street)
    expect(result.hotel_address.id).toBe(hotelAddress.id)
  })
})
