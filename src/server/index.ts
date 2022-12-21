import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '../../public/swagger.json'
// security
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
//routes
import router from '../routes'
import { logInfo } from '../utils/logger'

dotenv.config()

const server: Express = express()

// security config
server.use(helmet())
server.use(cors())

// content-type config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// swagger docs config route
server.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    explorer: true
  })
)

// define server to use '/api' and routes
server.use('/api', router)

// static server
server.use(express.static('/public'))

// connect to db
mongoose.connect(process.env.DB_HOST as string)
logInfo(process.env.DB_HOST as string)

server.get('/', (_req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
