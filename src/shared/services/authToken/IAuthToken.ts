import { JwtPayload } from 'jsonwebtoken'

export interface IAuthToken {
  sign(payload: string | number | Record<string, string | number>): string
  verify(token: string, key: string): string | JwtPayload
}
