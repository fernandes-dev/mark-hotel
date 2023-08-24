import { AppError } from '../../../../shared/errors/AppError'
import { Hotel } from '../../../hotels/entities/Hotel'
import { HotelsRepositoryInMemory } from '../../../hotels/repositories/in-memory/HotelsRepositoryInMemory'
import { HotelRoomsRepositoryInMemory } from '../../repositories/in-memory/HotelRoomsRepositoryInMemory'
import { CreateHotelRoomUseCase } from './CreateHotelRoomUseCase'

describe('create hotel room', () => {
  let hotelRoomsRepositoryInMemory: HotelRoomsRepositoryInMemory
  let hotelsRepositoryInMemory: HotelsRepositoryInMemory

  let createHotelRoomUseCase: CreateHotelRoomUseCase

  let hotel: Hotel

  beforeEach(async () => {
    hotelRoomsRepositoryInMemory = new HotelRoomsRepositoryInMemory()
    hotelsRepositoryInMemory = new HotelsRepositoryInMemory()

    createHotelRoomUseCase = new CreateHotelRoomUseCase(
      hotelRoomsRepositoryInMemory,
      hotelsRepositoryInMemory
    )

    const rooms_available = 10
    const rooms_booked = 10
    hotel = await hotelsRepositoryInMemory.create({
      name: `Mark Hotel`,
      rooms_available,
      rooms_booked,
    })

    for (let index = 0; index < rooms_available; index++) {
      await hotelRoomsRepositoryInMemory.create({
        hotel_id: hotel.id,
        number: index,
        price: index + 10,
        status: 'AVAILABLE',
      })
    }

    for (let index = 0; index < rooms_booked; index++) {
      await hotelRoomsRepositoryInMemory.create({
        hotel_id: hotel.id,
        number: index + rooms_available,
        price: index + 10,
        status: 'UNAVAILABLE',
      })
    }
  })

  it(' should be able to create a hotel room', async () => {
    const result = await createHotelRoomUseCase.execute({
      hotel_id: hotel.id,
      number: hotel.rooms_available * 2 + 1,
      price: 50,
      status: 'AVAILABLE',
    })

    expect(result).toHaveProperty('id')
  })

  it(' should be able to update rooms available count', async () => {
    const NEW_ROOMS_AVAILABLE_COUNT = 5

    for (let index = 0; index < NEW_ROOMS_AVAILABLE_COUNT; index++) {
      await createHotelRoomUseCase.execute({
        hotel_id: hotel.id,
        number: hotel.rooms_available * 2 + index,
        price: 50,
        status: 'AVAILABLE',
      })
    }

    const foundHotel = await hotelsRepositoryInMemory.findById(hotel.id)

    expect(foundHotel.rooms_available).toBe(
      hotel.rooms_available + NEW_ROOMS_AVAILABLE_COUNT
    )
  })

  it(' should be able to update rooms unavailable count', async () => {
    const NEW_ROOMS_UNAVAILABLE_COUNT = 5

    for (let index = 0; index < NEW_ROOMS_UNAVAILABLE_COUNT; index++) {
      await createHotelRoomUseCase.execute({
        hotel_id: hotel.id,
        number: hotel.rooms_available * 2 + index,
        price: 50,
        status: 'UNAVAILABLE',
      })
    }

    const foundHotel = await hotelsRepositoryInMemory.findById(hotel.id)

    expect(foundHotel.rooms_booked).toBe(
      hotel.rooms_booked + NEW_ROOMS_UNAVAILABLE_COUNT
    )
  })

  it(' should not be able to update rooms available count when is unnecessary', async () => {
    const HOTEL_ROOMS_AVAILABLE_COUNT = 20

    await hotelsRepositoryInMemory.updateById({
      id: hotel.id,
      rooms_available: HOTEL_ROOMS_AVAILABLE_COUNT,
    })

    const NEW_ROOMS_AVAILABLE_COUNT = 5
    for (let index = 0; index < NEW_ROOMS_AVAILABLE_COUNT; index++) {
      await createHotelRoomUseCase.execute({
        hotel_id: hotel.id,
        number: hotel.rooms_available * 2 + index,
        price: 50,
        status: 'AVAILABLE',
      })
    }

    const foundHotel = await hotelsRepositoryInMemory.findById(hotel.id)

    const roomsAvailableCount =
      await hotelRoomsRepositoryInMemory.countByHotelIdAndStatus(
        hotel.id,
        'AVAILABLE'
      )

    expect(roomsAvailableCount).toBe(
      hotel.rooms_available + NEW_ROOMS_AVAILABLE_COUNT
    )
    expect(foundHotel.rooms_available).toBe(HOTEL_ROOMS_AVAILABLE_COUNT)
  })

  it(' should not be able to create a hotel room with invalid status', async () => {
    await expect(async () => {
      await createHotelRoomUseCase.execute({
        hotel_id: hotel.id,
        number: 10,
        price: 50,
        status: 'INVALID STATUS' as never,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it(' should not be able to create a hotel room with existent number in the same hotel', async () => {
    await expect(async () => {
      for (let index = 0; index < 3; index += 1) {
        await createHotelRoomUseCase.execute({
          hotel_id: hotel.id,
          number: 10,
          price: 50,
          status: 'AVAILABLE',
        })
      }
    }).rejects.toBeInstanceOf(AppError)
  })
})
