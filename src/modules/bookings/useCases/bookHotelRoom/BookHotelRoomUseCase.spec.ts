import { randomUUID } from 'crypto'

import { HotelRoomsRepositoryInMemory } from '../../../hotel_rooms/repositories/in-memory/HotelRoomsRepositoryInMemory'
import { Hotel } from '../../../hotels/entities/Hotel'
import { HotelsRepositoryInMemory } from '../../../hotels/repositories/in-memory/HotelsRepositoryInMemory'
import { DatabaseTransactionInMemory } from '../../../shared/repositories/in-memory/DatabaseTransactionInMemory'
import { BookingsRepositoryInMemory } from '../../repositories/in-memory/BookingsRepositoryInMemory'
import { BookHotelRoomUseCase } from './BookHotelRoomUseCase'

describe('book hotel room use case', () => {
  let bookHotelRoomUseCase: BookHotelRoomUseCase

  let hotelsRepositoryInMemory: HotelsRepositoryInMemory
  let hotelRoomsRepositoryInMemory: HotelRoomsRepositoryInMemory
  let bookingsRepositoryInMemory: BookingsRepositoryInMemory
  let databaseTransactionInMemory: DatabaseTransactionInMemory

  let currentDate = new Date()

  let hotel: Hotel
  const ROOMS_AVAILABLE = [1, 2, 3, 4, 5]
  const ROOMS_UNAVAILABLE = [6, 7, 8, 9, 10]

  const ROOMS_COUNT = ROOMS_AVAILABLE.length + ROOMS_UNAVAILABLE.length

  function randomAvailableRoom() {
    const maxValue = Math.max(...ROOMS_AVAILABLE)
    const minValue = Math.min(...ROOMS_AVAILABLE)

    return Math.floor(
      Math.random() * (maxValue - minValue + minValue) + minValue
    )
  }

  beforeEach(async () => {
    hotelsRepositoryInMemory = new HotelsRepositoryInMemory()
    hotelRoomsRepositoryInMemory = new HotelRoomsRepositoryInMemory()
    bookingsRepositoryInMemory = new BookingsRepositoryInMemory()
    databaseTransactionInMemory = new DatabaseTransactionInMemory()

    bookHotelRoomUseCase = new BookHotelRoomUseCase(
      hotelsRepositoryInMemory,
      hotelRoomsRepositoryInMemory,
      bookingsRepositoryInMemory,
      databaseTransactionInMemory
    )

    hotel = await hotelsRepositoryInMemory.create({
      name: `mark_hotel_${randomUUID()}`,
      rooms_available: 10,
      rooms_booked: 10,
    })

    for (let index = 0; index < ROOMS_COUNT; index++) {
      await hotelRoomsRepositoryInMemory.create({
        hotel_id: hotel.id,
        number: index + 1,
        price: index + 10,
        status: ROOMS_AVAILABLE.includes(index + 1)
          ? 'AVAILABLE'
          : 'UNAVAILABLE',
      })
    }

    currentDate = new Date()
  })

  it(' should be able to book a room and set status unavailable', async () => {
    const tomorrow = new Date(currentDate)

    tomorrow.setDate(tomorrow.getDate() + 1)

    const roomNumber = randomAvailableRoom()

    await bookHotelRoomUseCase.execute({
      client_email: 'eduardo.yugan@gmail.com',
      start_date: currentDate.toISOString(),
      end_date: tomorrow.toISOString(),
      hotel_id: hotel.id,
      room_number: roomNumber,
    })

    const room = await hotelRoomsRepositoryInMemory.findByHotelIdAndNumber(
      hotel.id,
      roomNumber
    )

    const bookIsAvailable =
      await bookingsRepositoryInMemory.checkRoomIsAvailable({
        id: room.id,
        start_date: currentDate,
        end_date: tomorrow,
      })

    expect(bookIsAvailable).toBe(false)
  })
})
