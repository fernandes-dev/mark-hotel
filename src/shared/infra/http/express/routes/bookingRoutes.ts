import { Router } from 'express'

import { bookHotelRoomController } from '../../../../../modules/bookings/useCases/bookHotelRoom'
import { listHotelRoomsController } from '../../../../../modules/hotel_rooms/useCases/listHotelRooms'

const bookingRoutes = Router()

bookingRoutes.get('/:hotel_id', (req, res) =>
  listHotelRoomsController.executeImplementation(req, res)
)

bookingRoutes.post('/:hotel_id', (req, res) =>
  bookHotelRoomController.executeImplementation(req, res)
)

export { bookingRoutes }
