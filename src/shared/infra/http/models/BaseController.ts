import { Request, Response } from 'express'

export abstract class BaseController {
  protected abstract executeImplementation(
    request: Request,
    response: Response
  ): Promise<Response>

  public async execute(request: Request, response: Response): Promise<void> {
    try {
      await this.executeImplementation(request, response)
    } catch (error) {
      this.fail(response, error)
    }
  }

  public static jsonResponse(
    response: Response,
    statusCode: number,
    message: string
  ): Response {
    return response.status(statusCode).json({ message })
  }

  public ok<T>(response: Response, dto?: T) {
    if (dto) return response.status(200).json(dto)

    return response.status(200).send()
  }

  public created<T>(response: Response, dto?: T): Response {
    if (dto) return response.status(201).json(dto)

    return response.status(201).send()
  }

  public unauthorized(response: Response): Response {
    return response.status(401).send()
  }

  public fail(response: Response, error: Error | string): Response {
    return response
      .status(500)
      .json({ message: 'internal server error', error })
  }
}
