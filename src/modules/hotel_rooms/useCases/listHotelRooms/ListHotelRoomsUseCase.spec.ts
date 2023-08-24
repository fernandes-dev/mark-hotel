import { HotelRoomsRepositoryInMemory } from '../../repositories/in-memory/HotelRoomsRepositoryInMemory'
import { ListHotelRoomsUseCase } from './ListHotelRoomsUseCase'

describe('list hotel rooms use case', () => {
  let listHotelRoomsUseCase: ListHotelRoomsUseCase

  let hotelRoomsRepositoryInMemory: HotelRoomsRepositoryInMemory

  const hotel_id = 1
  const HOTEL_ROOMS_COUNT = 10

  beforeEach(async () => {
    hotelRoomsRepositoryInMemory = new HotelRoomsRepositoryInMemory()

    listHotelRoomsUseCase = new ListHotelRoomsUseCase(
      hotelRoomsRepositoryInMemory
    )

    for (let index = 0; index < HOTEL_ROOMS_COUNT; index++) {
      await hotelRoomsRepositoryInMemory.create({
        hotel_id,
        number: index,
        price: index + 1,
        status: index % 2 === 0 ? 'AVAILABLE' : 'UNAVAILABLE',
      })
    }
  })

  it(' should be able to get hotel rooms', async () => {
    const hotelRooms = await listHotelRoomsUseCase.execute(hotel_id)

    expect(hotelRooms.length > 0).toBe(true)
  })
})
