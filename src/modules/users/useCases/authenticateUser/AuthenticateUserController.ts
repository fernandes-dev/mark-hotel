import { Request, Response } from 'express'

import { BaseController } from '../../../../shared/infra/http/models/BaseController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController extends BaseController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body

    const { token } = await this.authenticateUserUseCase.execute(
      email,
      password
    )

    return this.ok(response, { token })
  }
}
