import { AppError } from '../../../../shared/errors/AppError'
import { IHotelRoomsRepository } from '../../../hotel_rooms/repositories/IHotelRoomsRepository'
import { IHotelsRepository } from '../../../hotels/repositories/IHotelsRepository'
import { IDatabaseTransaction } from '../../../shared/repositories/IDatabaseTransaction'
import { IBookingsRepository } from '../../repositories/IBookingsRepository'

interface IRequest {
  client_email: string
  hotel_id: number
  room_number: number
  start_date: string
  end_date: string
}

export class BookHotelRoomUseCase {
  constructor(
    private hotelsRepository: IHotelsRepository,
    private hotelRoomsRepository: IHotelRoomsRepository,
    private bookingsRepository: IBookingsRepository,
    private databaseTransaction: IDatabaseTransaction
  ) {}

  async execute({
    client_email,
    hotel_id,
    room_number,
    start_date,
    end_date,
  }: IRequest) {
    const foundRoom = await this.hotelRoomsRepository.findByHotelIdAndNumber(
      hotel_id,
      room_number
    )

    if (foundRoom.status === 'UNAVAILABLE')
      throw new AppError('room is unavailable', 401)

    const parsedStartDate = new Date(start_date)
    const parsedEndDate = new Date(end_date)

    const roomIsAvailable = await this.bookingsRepository.checkRoomIsAvailable({
      id: foundRoom.id,
      start_date: parsedStartDate,
      end_date: parsedEndDate,
    })

    if (!roomIsAvailable) throw new AppError('room is unavailable', 401)

    const foundHotel = await this.hotelsRepository.findById(hotel_id)

    if (!foundHotel) throw new AppError('hotel not found', 404)

    const bookDateIsNow =
      new Date().toDateString() === parsedStartDate.toDateString()

    await this.databaseTransaction.transaction([
      this.bookingsRepository.create({
        client_email,
        hotel_room_id: foundRoom.id,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
      }),
      bookDateIsNow
        ? this.hotelsRepository.updateById({
            id: hotel_id,
            rooms_available: foundHotel.rooms_available - 1,
            rooms_booked: foundHotel.rooms_booked + 1,
          })
        : null,
      bookDateIsNow
        ? this.hotelRoomsRepository.updateById({
            id: foundRoom.id,
            status: 'UNAVAILABLE',
          })
        : null,
    ])
  }
}
