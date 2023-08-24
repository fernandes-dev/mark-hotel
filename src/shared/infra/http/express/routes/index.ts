import express from 'express'

import { hotelRoutes } from './hotelRoutes'
import { usersRoutes } from './usersRoutes'

const routes = express()

routes.use('/users', usersRoutes)
routes.use('/hotels', hotelRoutes)

export { routes }
