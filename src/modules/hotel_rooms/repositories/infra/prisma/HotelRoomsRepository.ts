import { database } from '../../../../../shared/infra/database/prisma/database'
import { ICreateHotelRoomDTO } from '../../../dtos/ICreateHotelRoomDTO'
import { IUpdateHotelRoomDTO } from '../../../dtos/IUpdateHotelRoomDTO'
import { HotelRoom } from '../../../entities/HotelRoom'
import { IHotelRoomsRepository } from '../../IHotelRoomsRepository'

export class HotelRoomsRepository implements IHotelRoomsRepository {
  private repository: typeof database.hotel_rooms

  constructor() {
    this.repository = database.hotel_rooms
  }

  async create({
    hotel_id,
    number,
    price,
    status,
  }: ICreateHotelRoomDTO): Promise<HotelRoom> {
    return this.repository.create({
      data: { hotel_id, number, price, status },
    })
  }

  async updateById({
    id,
    number,
    price,
    status,
  }: IUpdateHotelRoomDTO): Promise<HotelRoom> {
    return this.repository.update({
      data: { number, price, status },
      where: { id },
    })
  }

  async findById(id: number): Promise<HotelRoom> {
    return this.repository.findUnique({ where: { id } })
  }

  async findByHotelIdAndNumber(
    hotel_id: number,
    room_number: number
  ): Promise<HotelRoom> {
    return this.repository.findFirst({
      where: { hotel_id, number: room_number },
    })
  }

  async countByHotelIdAndStatus(
    hotel_id: number,
    status: 'AVAILABLE' | 'UNAVAILABLE'
  ): Promise<number> {
    return this.repository.count({
      where: {
        hotel_id,
        status,
      },
    })
  }

  async list(hotel_id: number): Promise<HotelRoom[]> {
    return this.repository.findMany({
      where: { hotel_id },
    })
  }
}
