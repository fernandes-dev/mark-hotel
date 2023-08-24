import { AppError } from '../../../../shared/errors/AppError'
import { IHotelRoomsRepository } from '../../../hotel_rooms/repositories/IHotelRoomsRepository'
import { IHotelsRepository } from '../../../hotels/repositories/IHotelsRepository'
import { IDatabaseTransaction } from '../../../shared/repositories/IDatabaseTransaction'
import { IBookingsRepository } from '../../repositories/IBookingsRepository'

export interface IBookHotelRoomData {
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
  }: IBookHotelRoomData) {
    const data = { client_email, hotel_id, room_number, start_date, end_date }

    Object.values(data).forEach((value) => {
      if (value === undefined) throw new AppError('invalid request', 400)
    })

    const parsedHotelId = Number(hotel_id)

    const foundRoom = await this.hotelRoomsRepository.findByHotelIdAndNumber(
      parsedHotelId,
      room_number
    )

    const parsedStartDate = new Date(start_date)
    const parsedEndDate = new Date(end_date)

    const roomDateIsAvailable =
      await this.bookingsRepository.checkRoomIsAvailable({
        id: foundRoom.id,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
      })

    if (!roomDateIsAvailable) throw new AppError('room is unavailable', 401)

    if (!foundRoom || foundRoom.status === 'UNAVAILABLE')
      throw new AppError('room is unavailable', 401)

    const foundHotel = await this.hotelsRepository.findById(parsedHotelId)

    if (!foundHotel) throw new AppError('hotel not found', 404)

    const bookDateIsNow =
      new Date().toDateString() === parsedStartDate.toDateString()

    const transactions: Promise<unknown>[] = [
      this.bookingsRepository.create({
        client_email,
        hotel_room_id: foundRoom.id,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
      }),
    ]

    if (bookDateIsNow) {
      transactions.push(
        this.hotelsRepository.updateById({
          id: parsedHotelId,
          rooms_available: foundHotel.rooms_available - 1,
          rooms_booked: foundHotel.rooms_booked + 1,
        }),
        this.hotelRoomsRepository.updateById({
          id: foundRoom.id,
          status: 'UNAVAILABLE',
        })
      )
    }

    await this.databaseTransaction.transaction(transactions)
  }
}
