import { AuthToken } from '../../../../shared/services/authToken/implementations/AuthToken'
import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

describe('authenticate user use case', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase
  let usersRepositoryInMemory: UsersRepositoryInMemory
  let hashService: HashService
  let authTokenService: AuthToken

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    hashService = new HashService()
    authTokenService = new AuthToken()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashService,
      authTokenService
    )
  })

  it(' should be able to authenticate user', async () => {
    const data = {
      name: 'Eduardo Fernandes',
      email: 'contato@scriptn.com.br',
      password: '123',
    }

    const hashedPassword = await hashService.hash(data.password)

    await usersRepositoryInMemory.create({ ...data, password: hashedPassword })

    const token = await authenticateUserUseCase.execute(
      data.email,
      data.password
    )

    expect(token).toBeDefined()
  })

  it(' should not be able to authenticate invalid user', async () => {
    const token = await authenticateUserUseCase.execute(
      'invalid email',
      'invalid password'
    )

    expect(token).toBeNull()
  })
})
