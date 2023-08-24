import { BaseRepositoryInMemory } from '../../../shared/repositories/in-memory/BaseRepositoryInMemory'
import { ICreateHotelDTO } from '../../dtos/ICreateHotelDTO'
import { IUpdateHotelDTO } from '../../dtos/IUpdateHotelDTO'
import { Hotel } from '../../entities/Hotel'
import { IHotelsRepository } from '../IHotelsRepository'

export class HotelsRepositoryInMemory
  extends BaseRepositoryInMemory
  implements IHotelsRepository
{
  private hotels: Hotel[] = []

  async create({
    name,
    rooms_available,
    rooms_booked,
  }: ICreateHotelDTO): Promise<Hotel> {
    const data = {
      created_at: new Date(),
      id: this.incrementalID('hotels'),
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
    const data = this.removeUndefinedFromDTO({
      name,
      rooms_available,
      rooms_booked,
    })

    const foundIndex = this.hotels.findIndex((h) => h.id === id)

    const updatedHotel = {
      ...this.hotels[foundIndex],
      ...data,
    }

    this.hotels[foundIndex] = updatedHotel

    return { ...updatedHotel }
  }
}
