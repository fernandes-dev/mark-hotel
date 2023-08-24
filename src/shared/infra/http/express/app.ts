import 'dotenv/config'
import 'express-async-errors'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import { AppError } from '../../../errors/AppError'
import { startQueue } from '../../../services/queue/implementations'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message })

  console.log('internal error', err)

  return res.status(500).json({ message: 'internal server error' })
})

startQueue().catch((err) => console.log(`error on queue startup`, err))

export { app }
