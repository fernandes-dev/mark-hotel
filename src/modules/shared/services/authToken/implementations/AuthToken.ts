import jwt from 'jsonwebtoken'

import { IAuthToken } from '../IAuthToken'

export class AuthToken implements IAuthToken {
  sign(payload: string | Record<string, string | number>): string {
    return jwt.sign(payload, process.env.APP_KEY, {
      expiresIn: '1h',
    })
  }

  verify(token: string, key: string): string | jwt.JwtPayload {
    return jwt.verify(token, key)
  }
}
