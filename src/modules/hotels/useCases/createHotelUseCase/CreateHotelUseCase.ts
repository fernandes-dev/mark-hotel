import { Hotel } from '../../entities/Hotel'
import { HotelAddress } from '../../entities/HotelAdress'
import { IHotelAddressRepository } from '../../repositories/IHotelAddressRepository'
import { IHotelsRepository } from '../../repositories/IHotelsRepository'

interface IAddress {
  street: string
  zipcode: string
  country: string
}

interface IRequest {
  name: string
  address: IAddress
  rooms_available: number
  rooms_booked: number
}

interface IResponse {
  hotel: Hotel
  hotel_address: HotelAddress
}

export class CreateHotelUseCase {
  constructor(
    private hotelsRepository: IHotelsRepository,
    private hotelsAddressRepository: IHotelAddressRepository
  ) {}

  async execute({
    address,
    name,
    rooms_available,
    rooms_booked,
  }: IRequest): Promise<IResponse> {
    const hotel = await this.hotelsRepository.create({
      name,
      rooms_available,
      rooms_booked,
    })

    const hotel_address = await this.hotelsAddressRepository.create({
      country: address.country,
      hotel_id: hotel.id,
      street: address.street,
      zipcode: address.zipcode,
    })

    return { hotel, hotel_address }
  }
}
