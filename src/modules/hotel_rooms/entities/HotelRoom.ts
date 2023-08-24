import { hotel_rooms } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class HotelRoom implements hotel_rooms {
  id: number
  number: number
  price: Decimal
  status: string
  hotel_id: number
  created_at: Date
  updated_at: Date

  static statusIsValid(status: string) {
    return ['AVAILABLE', 'UNAVAILABLE'].includes(status)
  }
}
