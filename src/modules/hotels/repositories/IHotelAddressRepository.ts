import { ICreateHotelsAddressDTO } from '../dtos/ICreateHotelAddressDTO'
import { IUpdateHotelAddressDTO } from '../dtos/IUpdateHotelAddressDTO'
import { HotelAddress } from '../entities/HotelAdress'

export interface IHotelAddressRepository {
  create(data: ICreateHotelsAddressDTO): Promise<HotelAddress>
  findByHotelId(hotel_id: number): Promise<HotelAddress>
  updateById(data: IUpdateHotelAddressDTO): Promise<HotelAddress>
}
