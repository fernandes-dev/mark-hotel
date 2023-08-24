import express from 'express'

import { createHotelRoomController } from '../../../../../modules/hotel_rooms/useCases/createHotelRoom'
import { createHotelController } from '../../../../../modules/hotels/useCases/createHotel'
import { updateHotelController } from '../../../../../modules/hotels/useCases/updateHotel'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const hotelRoutes = express()

hotelRoutes.post('/', ensureAuthenticated, (req, res) =>
  createHotelController.executeImplementation(req, res)
)

hotelRoutes.put('/:id', ensureAuthenticated, (req, res) =>
  updateHotelController.executeImplementation(req, res)
)

hotelRoutes.post('/:hotel_id/rooms', ensureAuthenticated, (req, res) =>
  createHotelRoomController.executeImplementation(req, res)
)

export { hotelRoutes }
