import { ICheckRoomIsAvailableDTO } from '../dtos/ICheckRoomIsAvailableDTO'
import { ICreateBookingDTO } from '../dtos/ICreateBookingDTO'

export interface IBookingsRepository {
  create(data: ICreateBookingDTO): Promise<void>
  checkRoomIsAvailable(data: ICheckRoomIsAvailableDTO): Promise<boolean>
}
