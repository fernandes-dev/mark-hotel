import { IHashService } from '../../../shared/services/hash/IHashService'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashService: IHashService
  ) {}

  async execute({ name, email, password }: IRequest) {
    const hashedPassword = await this.hashService.hash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
