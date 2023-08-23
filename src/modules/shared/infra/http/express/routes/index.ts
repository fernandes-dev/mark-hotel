import express from 'express'

import { usersRoutes } from './usersRoutes'

const routes = express()

routes.use('/users', usersRoutes)

export { routes }
