export interface ICreateHotelRoomDTO {
  number: number
  price: number
  status: 'AVAILABLE' | 'UNAVAILABLE'
  hotel_id: number
}
