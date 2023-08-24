import { Request, Response } from 'express'

import { BaseController } from '../../../../shared/infra/http/models/BaseController'
import { IQueueProducer } from '../../../../shared/services/queue/IQueueProducer'

export class BookHotelRoomController extends BaseController {
  constructor(private queueProducer: IQueueProducer) {
    super()
  }

  async executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { hotel_id } = request.params

    const { client_email, room_number, start_date, end_date } = request.body

    await this.queueProducer.send(
      JSON.stringify({
        client_email,
        room_number,
        start_date,
        end_date,
        hotel_id,
      })
    )

    return this.ok(response)
  }
}
