import { BaseRepositoryInMemory } from '../../../shared/repositories/in-memory/BaseRepositoryInMemory'
import { ICreateHotelsAddressDTO } from '../../dtos/ICreateHotelAddressDTO'
import { IUpdateHotelAddressDTO } from '../../dtos/IUpdateHotelAddressDTO'
import { HotelAddress } from '../../entities/HotelAdress'
import { IHotelAddressRepository } from '../IHotelAddressRepository'

export class HotelAddressRepositoryInMemory
  extends BaseRepositoryInMemory
  implements IHotelAddressRepository
{
  private hotel_address: HotelAddress[] = []

  async create({
    country,
    hotel_id,
    street,
    zipcode,
  }: ICreateHotelsAddressDTO): Promise<HotelAddress> {
    const data: HotelAddress = {
      id: this.incrementalID('hotel_address'),
      country,
      created_at: new Date(),
      hotel_id,
      street,
      updated_at: new Date(),
      zipcode,
    }

    this.hotel_address.push(data)

    return data
  }

  async findByHotelId(hotel_id: number): Promise<HotelAddress> {
    return this.hotel_address.find((ha) => ha.hotel_id === hotel_id)
  }

  async updateById({
    id,
    country,
    hotel_id,
    street,
    zipcode,
  }: IUpdateHotelAddressDTO): Promise<HotelAddress> {
    const data = this.removeUndefinedFromDTO({
      country,
      hotel_id,
      street,
      zipcode,
    })

    const foundIndex = this.hotel_address.findIndex((h) => h.id === id)

    const updatedHotelAddress = {
      ...this.hotel_address[foundIndex],
      ...data,
    }

    this.hotel_address[foundIndex] = updatedHotelAddress

    return { ...updatedHotelAddress }
  }
}
