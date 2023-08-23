import { database } from '../../../../shared/infra/database/prisma/database'
import { ICreateHotelsAddressDTO } from '../../../dtos/ICreateHotelAddressDTO'
import { IUpdateHotelAddressDTO } from '../../../dtos/IUpdateHotelAddressDTO'
import { HotelAddress } from '../../../entities/HotelAdress'
import { IHotelAddressRepository } from '../../IHotelAddressRepository'

export class HotelAddressRepository implements IHotelAddressRepository {
  private repository: typeof database.hotel_address

  constructor() {
    this.repository = database.hotel_address
  }

  async create({
    country,
    hotel_id,
    street,
    zipcode,
  }: ICreateHotelsAddressDTO): Promise<HotelAddress> {
    return this.repository.create({
      data: {
        country,
        hotel_id,
        street,
        zipcode,
      },
    })
  }

  async findByHotelId(hotel_id: number): Promise<HotelAddress> {
    return this.repository.findFirst({
      where: { hotel_id },
    })
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

    return this.repository.update({
      data,
      where: { id },
    })
  }
}
