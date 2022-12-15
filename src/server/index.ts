import express, { Express, Request, Response } from 'express'
// security
import cors from 'cors'
import helmet from 'helmet'
//routes
import router from '../routes'

const server: Express = express()

// define server to use '/api' and routes
server.use('/api', router)

// static server
server.use(express.static('/public'))

// security config
server.use(helmet())
server.use(cors())

// content-type config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

server.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
