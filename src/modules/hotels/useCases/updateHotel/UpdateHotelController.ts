import { Request, Response } from 'express'

import { BaseController } from '../../../../shared/infra/http/models/BaseController'
import { UpdateHotelUseCase } from './UpdateHotelUseCase'

export class UpdateHotelController extends BaseController {
  constructor(private updateHotelUseCase: UpdateHotelUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params
    const { address, name, rooms_available, rooms_booked } = request.body

    const result = await this.updateHotelUseCase.execute({
      id: Number(id),
      address,
      name,
      rooms_available,
      rooms_booked,
    })

    return this.ok(response, result)
  }
}
