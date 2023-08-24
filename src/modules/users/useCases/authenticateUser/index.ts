import { AuthToken } from '../../../../shared/services/authToken/implementations/AuthToken'
import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { UsersRepository } from '../../repositories/infra/prisma/UsersRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const usersRepository = new UsersRepository()
const hashService = new HashService()
const tokenService = new AuthToken()

const authenticateUserUseCase = new AuthenticateUserUseCase(
  usersRepository,
  hashService,
  tokenService
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserController }
