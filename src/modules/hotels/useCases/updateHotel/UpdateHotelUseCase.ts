import { AppError } from '../../../../shared/errors/AppError'
import { Hotel } from '../../entities/Hotel'
import { HotelAddress } from '../../entities/HotelAdress'
import { IHotelAddressRepository } from '../../repositories/IHotelAddressRepository'
import { IHotelsRepository } from '../../repositories/IHotelsRepository'

interface IAddress {
  street?: string
  zipcode?: string
  country?: string
}

interface IRequest {
  id: number
  name?: string
  address?: IAddress
  rooms_available?: number
  rooms_booked?: number
}

interface IResponse {
  hotel: Hotel
  hotel_address: HotelAddress
}

export class UpdateHotelUseCase {
  constructor(
    private hotelsRepository: IHotelsRepository,
    private hotelsAddressRepository: IHotelAddressRepository
  ) {}

  async execute({
    id,
    address,
    name,
    rooms_available,
    rooms_booked,
  }: IRequest): Promise<IResponse> {
    const foundHotel = await this.hotelsRepository.findById(id)

    if (!foundHotel) throw new AppError('hotel not found', 404)

    const updatedHotel = await this.hotelsRepository.updateById({
      id: foundHotel.id,
      name,
      rooms_available,
      rooms_booked,
    })

    const foundHotelAddress = await this.hotelsAddressRepository.findByHotelId(
      foundHotel.id
    )

    if (!foundHotelAddress) throw new AppError('hotel address not found', 404)

    const hotel_address = await this.hotelsAddressRepository.updateById({
      id: foundHotelAddress.id,
      country: address.country,
      street: address.street,
      zipcode: address.zipcode,
    })

    return { hotel: updatedHotel, hotel_address }
  }
}
