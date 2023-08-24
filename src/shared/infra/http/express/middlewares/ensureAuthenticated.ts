import { NextFunction, Request, Response } from 'express'

import { UsersRepository } from '../../../../../modules/users/repositories/infra/prisma/UsersRepository'
import { AuthToken } from '../../../../services/authToken/implementations/AuthToken'

const authTokenService = new AuthToken()

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = request.headers.authorization

  if (!authHeader)
    return response.status(401).json({ message: 'token is missing' })

  const [, token] = authHeader.split(' ')

  try {
    const { email } = authTokenService.verify(token, process.env.APP_KEY)

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findByEmail(email.toString())

    if (!user) return response.status(401).json({ message: 'user not found' })

    request.user = {
      email: user.email,
    }

    next()
  } catch (error) {
    return response.status(401).json({ message: 'invalid token' })
  }
}
