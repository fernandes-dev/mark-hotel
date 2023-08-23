import { ICreateHotelDTO } from '../../dtos/ICreateHotelDTO'
import { IUpdateHotelDTO } from '../../dtos/IUpdateHotelDTO'
import { Hotel } from '../../entities/Hotel'
import { IHotelsRepository } from '../IHotelsRepository'

export class HotelsRepositoryInMemory implements IHotelsRepository {
  private hotels: Hotel[] = []

  private incrementalID() {
    return (this.hotels[this.hotels.length - 1]?.id ?? 0) + 1
  }

  async create({
    name,
    rooms_available,
    rooms_booked,
  }: ICreateHotelDTO): Promise<Hotel> {
    const data = {
      created_at: new Date(),
      id: this.incrementalID(),
      name,
      rooms_available,
      rooms_booked,
      updated_at: new Date(),
    }

    this.hotels.push(data)

    return data
  }

  async findById(id: number): Promise<Hotel> {
    return this.hotels.find((h) => h.id === id)
  }

  async updateById({
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

    const foundIndex = this.hotels.findIndex((h) => h.id === id)

    const updatedHotel = {
      ...this.hotels[foundIndex],
      ...data,
    }

    this.hotels[foundIndex] = updatedHotel

    return updatedHotel
  }
}
