import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  private incrementalID() {
    return (this.users[this.users.length - 1]?.id ?? 0) + 1
  }

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user: User = {
      email,
      id: this.incrementalID(),
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
