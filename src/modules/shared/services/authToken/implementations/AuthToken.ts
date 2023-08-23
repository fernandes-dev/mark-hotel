import jwt from 'jsonwebtoken'

import { IAuthToken } from '../IAuthToken'

interface IAuthTokenData {
  email: string
  iat: number
  exp: number
}

export class AuthToken implements IAuthToken {
  sign(payload: string | Record<string, string | number>): string {
    return jwt.sign(payload, process.env.APP_KEY, {
      expiresIn: '1h',
    })
  }

  verify(token: string, key: string): IAuthTokenData {
    return jwt.verify(token, key) as IAuthTokenData
  }
}
