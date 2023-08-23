import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.use(routes)

export { app }
