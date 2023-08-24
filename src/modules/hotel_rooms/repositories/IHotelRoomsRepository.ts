import { ICreateHotelRoomDTO } from '../dtos/ICreateHotelRoomDTO'
import { IUpdateHotelRoomDTO } from '../dtos/IUpdateHotelRoomDTO'
import { HotelRoom } from '../entities/HotelRoom'

export interface IHotelRoomsRepository {
  create(data: ICreateHotelRoomDTO): Promise<HotelRoom>
  updateById(data: IUpdateHotelRoomDTO): Promise<HotelRoom>
  findById(id: number): Promise<HotelRoom>
  findByHotelIdAndNumber(
    hotel_id: number,
    room_number: number
  ): Promise<HotelRoom>
  countByHotelIdAndStatus(
    hotel_id: number,
    status: 'AVAILABLE' | 'UNAVAILABLE'
  ): Promise<number>
}
