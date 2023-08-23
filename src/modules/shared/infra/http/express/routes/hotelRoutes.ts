import express from 'express'

import { createHotelController } from '../../../../../hotels/useCases/createHotelUseCase'
import { updateHotelController } from '../../../../../hotels/useCases/updateHotelUseCase'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const hotelRoutes = express()

hotelRoutes.post('/', ensureAuthenticated, (req, res) =>
  createHotelController.executeImplementation(req, res)
)

hotelRoutes.put('/:id', ensureAuthenticated, (req, res) =>
  updateHotelController.executeImplementation(req, res)
)

export { hotelRoutes }
