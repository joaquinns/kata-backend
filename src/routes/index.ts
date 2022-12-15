import express, { Express, Request, Response } from 'express'
import exampleRoute from './example.router'

let server: Express = express()

let rootRouter = express.Router()

rootRouter.get('/', (_req: Request, res: Response) => {
  res.send('Compadreeeee ta buena la response porque ves este mensaje!')
})

server.use('/', rootRouter) // localhost:8000/api/
server.use('/example', exampleRoute) // localhost:8000/api/example

export default server
