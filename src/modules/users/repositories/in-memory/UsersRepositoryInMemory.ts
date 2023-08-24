import { BaseRepositoryInMemory } from '../../../shared/repositories/in-memory/BaseRepositoryInMemory'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory
  extends BaseRepositoryInMemory
  implements IUsersRepository
{
  private users: User[] = []

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user: User = {
      email,
      id: this.incrementalID('users'),
      name,
      password,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users?.find((u) => u.email === email)
  }
}
