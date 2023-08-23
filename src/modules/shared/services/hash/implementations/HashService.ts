import bcrypt from 'bcrypt'

import { IHashService } from '../IHashService'

export class HashService implements IHashService {
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10)

    return hash
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }
}
