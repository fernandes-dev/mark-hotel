import { ICreateHotelDTO } from '../dtos/ICreateHotelDTO'
import { IUpdateHotelDTO } from '../dtos/IUpdateHotelDTO'
import { Hotel } from '../entities/Hotel'

export interface IHotelsRepository {
  create(data: ICreateHotelDTO): Promise<Hotel>
  findById(id: number): Promise<Hotel>
  updateById(data: IUpdateHotelDTO): Promise<Hotel>
}
