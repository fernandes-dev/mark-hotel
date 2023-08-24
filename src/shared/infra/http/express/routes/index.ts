import { Router } from 'express'

import { bookingRoutes } from './bookingRoutes'
import { hotelRoutes } from './hotelRoutes'
import { usersRoutes } from './usersRoutes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/hotels', hotelRoutes)
routes.use('/book', bookingRoutes)

export { routes }
