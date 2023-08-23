import express from 'express'

import { authenticateUserController } from '../../../../../users/useCases/authenticateUser'
import { createUserController } from '../../../../../users/useCases/createUser'

const usersRoutes = express()

usersRoutes.post('/', (req, res) =>
  createUserController.executeImplementation(req, res)
)

usersRoutes.post('/login', (req, res) =>
  authenticateUserController.executeImplementation(req, res)
)

export { usersRoutes }
