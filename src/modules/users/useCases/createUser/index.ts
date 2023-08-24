import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { UsersRepository } from '../../repositories/infra/prisma/UsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const usersRepository = new UsersRepository()

const hashService = new HashService()

const createUserUseCase = new CreateUserUseCase(usersRepository, hashService)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
