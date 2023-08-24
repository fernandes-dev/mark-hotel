import { bookings } from '@prisma/client'

export class Booking implements bookings {
  id: number
  hotel_room_id: number
  client_email: string
  start_date: Date
  end_date: Date
  created_at: Date
  updated_at: Date
}
