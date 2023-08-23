import express from 'express'

import { createUserController } from '../../../../../users/useCases/createUser'

const usersRoutes = express()

usersRoutes.post('/', (req, res) =>
  createUserController.executeImplementation(req, res)
)

export { usersRoutes }
