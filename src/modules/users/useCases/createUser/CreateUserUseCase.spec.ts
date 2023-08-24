import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('create user use case', () => {
  let createUserUseCase: CreateUserUseCase
  let usersRepositoryInMemory: UsersRepositoryInMemory
  let hashService: HashService

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    hashService = new HashService()

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashService
    )
  })

  it(' should be able to create user', async () => {
    const data = {
      name: 'Eduardo Fernandes',
      email: 'contato@scriptn.com.br',
      password: '123',
    }

    const user = await createUserUseCase.execute(data)

    expect(user.email).toBe(data.email)
    expect(user.password).not.toBe(data.password)
  })
})
