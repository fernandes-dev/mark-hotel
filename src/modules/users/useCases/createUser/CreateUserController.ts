import { Request, Response } from 'express'

import { BaseController } from '../../../shared/infra/http/models/BaseController'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { email, name, password } = request.body

      await this.createUserUseCase.execute({
        email,
        name,
        password,
      })

      return this.created(response)
    } catch (error) {
      this.fail(response, error)
    }
  }
}
