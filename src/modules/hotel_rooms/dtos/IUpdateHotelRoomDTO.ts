export interface IUpdateHotelRoomDTO {
  number?: number
  price?: number
  status?: 'AVAILABLE' | 'UNAVAILABLE'
  id: number
}
