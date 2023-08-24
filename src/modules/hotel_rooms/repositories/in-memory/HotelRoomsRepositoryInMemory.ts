import { Decimal } from '@prisma/client/runtime/library'

import { BaseRepositoryInMemory } from '../../../shared/repositories/in-memory/BaseRepositoryInMemory'
import { ICreateHotelRoomDTO } from '../../dtos/ICreateHotelRoomDTO'
import { IUpdateHotelRoomDTO } from '../../dtos/IUpdateHotelRoomDTO'
import { HotelRoom } from '../../entities/HotelRoom'
import { IHotelRoomsRepository } from '../IHotelRoomsRepository'

export class HotelRoomsRepositoryInMemory
  extends BaseRepositoryInMemory
  implements IHotelRoomsRepository
{
  private hotel_rooms: HotelRoom[] = []

  async create({
    hotel_id,
    number,
    price,
    status,
  }: ICreateHotelRoomDTO): Promise<HotelRoom> {
    const hotelRoom: HotelRoom = {
      id: this.incrementalID('hotel_rooms'),
      number,
      price: price as unknown as Decimal,
      status,
      hotel_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.hotel_rooms.push(hotelRoom)

    return { ...hotelRoom }
  }

  async updateById({
    id,
    number,
    price,
    status,
  }: IUpdateHotelRoomDTO): Promise<HotelRoom> {
    const data = this.removeUndefinedFromDTO({
      number,
      price,
      status,
    })

    const foundIndex = this.hotel_rooms.findIndex((h) => h.id === id)

    const updatedHotelRoom = {
      ...this.hotel_rooms[foundIndex],
      ...data,
    }

    this.hotel_rooms[foundIndex] = updatedHotelRoom

    return { ...updatedHotelRoom }
  }

  async findById(id: number): Promise<HotelRoom> {
    return this.hotel_rooms.find((h) => h.id === id)
  }

  async findByHotelIdAndNumber(
    hotel_id: number,
    room_number: number
  ): Promise<HotelRoom> {
    return this.hotel_rooms.find(
      (h) => h.hotel_id === hotel_id && h.number === room_number
    )
  }

  async countByHotelIdAndStatus(
    hotel_id: number,
    status: 'AVAILABLE' | 'UNAVAILABLE'
  ): Promise<number> {
    return (
      this.hotel_rooms.filter(
        (h) => h.hotel_id === hotel_id && h.status === status
      )?.length ?? 0
    )
  }

  async list(hotel_id: number): Promise<HotelRoom[]> {
    return this.hotel_rooms.filter((h) => h.hotel_id === hotel_id)
  }
}
