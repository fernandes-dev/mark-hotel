import { Request, Response } from 'express'

import { BaseController } from '../../../shared/infra/http/models/BaseController'
import { CreateHotelUseCase } from './CreateHotelUseCase'

export class CreateHotelController extends BaseController {
  constructor(private createHotelUseCase: CreateHotelUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { address, name, rooms_available, rooms_booked } = request.body

      await this.createHotelUseCase.execute({
        address,
        name,
        rooms_available,
        rooms_booked,
      })

      return this.created(response)
    } catch (error) {
      this.fail(response, error)
    }
  }
}
