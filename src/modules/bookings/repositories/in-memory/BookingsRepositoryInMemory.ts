import { BaseRepositoryInMemory } from '../../../shared/repositories/in-memory/BaseRepositoryInMemory'
import { ICheckRoomIsAvailableDTO } from '../../dtos/ICheckRoomIsAvailableDTO'
import { ICreateBookingDTO } from '../../dtos/ICreateBookingDTO'
import { Booking } from '../../entities/Booking'
import { IBookingsRepository } from '../IBookingsRepository'

export class BookingsRepositoryInMemory
  extends BaseRepositoryInMemory
  implements IBookingsRepository
{
  private bookings: Booking[] = []

  async create({
    client_email,
    end_date,
    hotel_room_id,
    start_date,
  }: ICreateBookingDTO): Promise<void> {
    const newBooking: Booking = {
      id: this.incrementalID('bookings'),
      client_email,
      end_date,
      hotel_room_id,
      start_date,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.bookings.push(newBooking)
  }

  async checkRoomIsAvailable({
    id,
    start_date,
    end_date,
  }: ICheckRoomIsAvailableDTO): Promise<boolean> {
    const startTime = start_date.getTime()
    const endTime = end_date.getTime()

    return !this.bookings
      .filter((b) => b.hotel_room_id === id)
      .find((b) => {
        const bookStartTime = b.start_date.getTime()

        const bookEndTime = b.end_date.getTime()

        const startTimeAlreadyBooked =
          startTime >= bookStartTime && startTime <= bookEndTime

        const endTimeAlreadyBooked =
          endTime >= bookStartTime && endTime <= bookEndTime

        return startTimeAlreadyBooked || endTimeAlreadyBooked
      })
  }
}
