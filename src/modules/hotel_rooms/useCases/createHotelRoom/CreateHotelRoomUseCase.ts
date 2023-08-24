import { AppError } from '../../../../shared/errors/AppError'
import { IHotelsRepository } from '../../../hotels/repositories/IHotelsRepository'
import { HotelRoom } from '../../entities/HotelRoom'
import { IHotelRoomsRepository } from '../../repositories/IHotelRoomsRepository'

type IStatusOptions = 'AVAILABLE' | 'UNAVAILABLE'

interface IRequest {
  hotel_id: number
  number: number
  price: number
  status: IStatusOptions
}

export class CreateHotelRoomUseCase {
  constructor(
    private hotelRoomsRepository: IHotelRoomsRepository,
    private hotelsRepository: IHotelsRepository
  ) {}

  async execute({ hotel_id, number, price, status }: IRequest) {
    const foundHotel = await this.hotelsRepository.findById(hotel_id)

    if (!foundHotel) throw new AppError('hotel not found', 404)

    if (!HotelRoom.statusIsValid(status))
      throw new AppError('invalid status', 400)

    const foundHotelRoomNumber =
      await this.hotelRoomsRepository.findByHotelIdAndNumber(hotel_id, number)

    if (foundHotelRoomNumber)
      throw new AppError('room number already exists for this hotel', 400)

    const hotelRoom = await this.hotelRoomsRepository.create({
      hotel_id,
      number,
      price,
      status,
    })

    const [availableRoomsCount, unavailableRoomsCount] = await Promise.all([
      this.hotelRoomsRepository.countByHotelIdAndStatus(hotel_id, 'AVAILABLE'),
      this.hotelRoomsRepository.countByHotelIdAndStatus(
        hotel_id,
        'UNAVAILABLE'
      ),
    ])

    const increaseRoomsCountByStatus: Record<
      IStatusOptions,
      () => Promise<void>
    > = {
      AVAILABLE: async () => {
        if (foundHotel.rooms_available < availableRoomsCount)
          await this.hotelsRepository.updateById({
            id: hotel_id,
            rooms_available: availableRoomsCount,
          })
      },
      UNAVAILABLE: async () => {
        if (foundHotel.rooms_booked < unavailableRoomsCount)
          await this.hotelsRepository.updateById({
            id: hotel_id,
            rooms_booked: unavailableRoomsCount,
          })
      },
    }

    await increaseRoomsCountByStatus[status]()

    return hotelRoom
  }
}
