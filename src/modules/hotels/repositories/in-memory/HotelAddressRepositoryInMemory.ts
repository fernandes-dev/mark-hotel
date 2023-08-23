import { ICreateHotelsAddressDTO } from '../../dtos/ICreateHotelAddressDTO'
import { IUpdateHotelAddressDTO } from '../../dtos/IUpdateHotelAddressDTO'
import { HotelAddress } from '../../entities/HotelAdress'
import { IHotelAddressRepository } from '../IHotelAddressRepository'

export class HotelAddressRepositoryInMemory implements IHotelAddressRepository {
  private hotel_address: HotelAddress[] = []

  private incrementalID() {
    return (this.hotel_address[this.hotel_address.length - 1]?.id ?? 0) + 1
  }

  async create({
    country,
    hotel_id,
    street,
    zipcode,
  }: ICreateHotelsAddressDTO): Promise<HotelAddress> {
    const data: HotelAddress = {
      id: this.incrementalID(),
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
    const data = {
      country,
      hotel_id,
      street,
      zipcode,
    }

    // remove undefined values
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) Reflect.deleteProperty(data, key)
    })

    const foundIndex = this.hotel_address.findIndex((h) => h.id === id)

    const updatedHotelAddress = {
      ...this.hotel_address[foundIndex],
      ...data,
    }

    this.hotel_address[foundIndex] = updatedHotelAddress

    return updatedHotelAddress
  }
}
