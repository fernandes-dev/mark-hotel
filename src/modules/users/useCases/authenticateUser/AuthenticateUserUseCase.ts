import { IAuthToken } from '../../../shared/services/authToken/IAuthToken'
import { IHashService } from '../../../shared/services/hash/IHashService'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashService: IHashService,
    private authTokenService: IAuthToken
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const foundUser = await this.usersRepository.findByEmail(email)

    if (!foundUser) return null

    const passwordIsValid = await this.hashService.compare(
      password,
      foundUser.password
    )

    if (!passwordIsValid) return null

    const token = this.authTokenService.sign({ email: foundUser.email })

    return { token }
  }
}
