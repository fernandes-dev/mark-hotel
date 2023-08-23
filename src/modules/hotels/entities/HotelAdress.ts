import { hotel_address } from '@prisma/client'

export class HotelAddress implements hotel_address {
  id: number
  street: string
  zipcode: string
  country: string
  hotel_id: number
  created_at: Date
  updated_at: Date
}
