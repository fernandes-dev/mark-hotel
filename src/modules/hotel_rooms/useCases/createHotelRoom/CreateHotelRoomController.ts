import { Request, Response } from 'express'

import { BaseController } from '../../../../shared/infra/http/models/BaseController'
import { CreateHotelRoomUseCase } from './CreateHotelRoomUseCase'

export class CreateHotelRoomController extends BaseController {
  constructor(private createHotelRoomUseCase: CreateHotelRoomUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { hotel_id } = request.params

    const { number, price, status } = request.body

    const result = await this.createHotelRoomUseCase.execute({
      hotel_id: Number(hotel_id),
      number,
      price,
      status,
    })

    return this.created(response, result)
  }
}
