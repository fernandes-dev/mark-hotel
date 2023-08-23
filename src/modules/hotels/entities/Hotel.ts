import { hotels } from '@prisma/client'

export class Hotel implements hotels {
  id: number
  name: string
  rooms_available: number
  rooms_booked: number
  created_at: Date
  updated_at: Date
}
