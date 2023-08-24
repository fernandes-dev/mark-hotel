import { Request, Response } from 'express'

import { BaseController } from '../../../../shared/infra/http/models/BaseController'
import { ListHotelRoomsUseCase } from './ListHotelRoomsUseCase'

export class ListHotelRoomsController extends BaseController {
  constructor(private listHotelRoomsUseCase: ListHotelRoomsUseCase) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { hotel_id } = request.params

    const result = await this.listHotelRoomsUseCase.execute(Number(hotel_id))

    return this.ok(response, result)
  }
}
