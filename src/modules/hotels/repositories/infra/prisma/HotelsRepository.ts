import { database } from '../../../../../shared/infra/database/prisma/database'
import { ICreateHotelDTO } from '../../../dtos/ICreateHotelDTO'
import { IUpdateHotelDTO } from '../../../dtos/IUpdateHotelDTO'
import { Hotel } from '../../../entities/Hotel'
import { IHotelsRepository } from '../../IHotelsRepository'

export class HotelsRepository implements IHotelsRepository {
  private repository: typeof database.hotels

  constructor() {
    this.repository = database.hotels
  }

  async create({
    name,
    rooms_available,
    rooms_booked,
  }: ICreateHotelDTO): Promise<Hotel> {
    return this.repository.create({
      data: {
        name,
        rooms_available,
        rooms_booked,
      },
    })
  }

  async findById(id: number): Promise<Hotel> {
    return this.repository.findUnique({ where: { id } })
  }
  updateById({
    id,
    name,
    rooms_available,
    rooms_booked,
  }: IUpdateHotelDTO): Promise<Hotel> {
    const data = {
      name,
      rooms_available,
      rooms_booked,
    }

    // remove undefined values
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) Reflect.deleteProperty(data, key)
    })

    return this.repository.update({
      data,
      where: { id },
    })
  }
}
