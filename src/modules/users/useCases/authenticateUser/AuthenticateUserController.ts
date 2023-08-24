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
    try {
      const { email, password } = request.body

      const { token } = await this.authenticateUserUseCase.execute(
        email,
        password
      )

      if (!token) return this.unauthorized(response)

      return this.ok(response, { token })
    } catch (error) {
      this.fail(response, error)
    }
  }
}
