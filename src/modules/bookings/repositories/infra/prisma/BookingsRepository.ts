import { database } from '../../../../../shared/infra/database/prisma/database'
import { ICheckRoomIsAvailableDTO } from '../../../dtos/ICheckRoomIsAvailableDTO'
import { ICreateBookingDTO } from '../../../dtos/ICreateBookingDTO'
import { IBookingsRepository } from '../../IBookingsRepository'

export class BookingsRepository implements IBookingsRepository {
  private repository: typeof database.bookings

  constructor() {
    this.repository = database.bookings
  }

  async create({
    client_email,
    end_date,
    hotel_room_id,
    start_date,
  }: ICreateBookingDTO): Promise<void> {
    await this.repository.create({
      data: {
        client_email,
        end_date,
        hotel_room_id,
        start_date,
      },
    })
  }

  async checkRoomIsAvailable({
    id,
    start_date,
    end_date,
  }: ICheckRoomIsAvailableDTO): Promise<boolean> {
    const foundBook = await this.repository.findFirst({
      where: {
        OR: [
          {
            start_date: {
              gte: start_date,
              lte: end_date,
            },
          },
          {
            end_date: {
              gte: start_date,
              lte: end_date,
            },
          },
        ],
        hotel_room_id: id,
      },
    })

    return !foundBook
  }
}
