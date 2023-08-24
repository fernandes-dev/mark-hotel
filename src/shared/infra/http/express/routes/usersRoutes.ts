import { Router } from 'express'

import { authenticateUserController } from '../../../../../modules/users/useCases/authenticateUser'
import { createUserController } from '../../../../../modules/users/useCases/createUser'

const usersRoutes = Router()

usersRoutes.post('/', (req, res) =>
  createUserController.executeImplementation(req, res)
)

usersRoutes.post('/login', (req, res) =>
  authenticateUserController.executeImplementation(req, res)
)

export { usersRoutes }
