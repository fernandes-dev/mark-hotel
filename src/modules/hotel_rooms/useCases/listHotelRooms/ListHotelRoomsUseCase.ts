import { IHotelRoomsRepository } from '../../repositories/IHotelRoomsRepository'

export class ListHotelRoomsUseCase {
  constructor(private hotelRoomsRepository: IHotelRoomsRepository) {}

  async execute(hotel_id: number) {
    return this.hotelRoomsRepository.list(hotel_id)
  }
}
