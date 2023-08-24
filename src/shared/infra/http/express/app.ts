import 'dotenv/config'
import 'express-async-errors'

import cors from 'cors'
import express, { Request, Response } from 'express'

import { AppError } from '../../../errors/AppError'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.use(routes)

app.use((err: unknown, req: Request, res: Response) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message })

  return res.status(500).json({ message: 'internal server error' })
})

export { app }
