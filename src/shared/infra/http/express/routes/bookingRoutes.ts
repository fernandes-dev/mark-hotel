import { Router } from 'express'

import { listHotelRoomsController } from '../../../../../modules/hotel_rooms/useCases/listHotelRooms'

const bookingRoutes = Router()

bookingRoutes.get('/:hotel_id', (req, res) =>
  listHotelRoomsController.executeImplementation(req, res)
)

export { bookingRoutes }
