import { database } from '../../../../shared/infra/database/prisma/database'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { User } from '../../../entities/User'
import { IUsersRepository } from '../../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: typeof database.users

  constructor() {
    this.repository = database.users
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const newUser = await this.repository.create({ data })

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.repository.findUnique({ where: { email } })

    return foundUser
  }
}
