import express, { Express, Request, Response } from 'express'
import authRoute from './auth.router'
import exampleRoute from './example.router'
import usersRoute from './user.router'

let server: Express = express()

let rootRouter = express.Router()

rootRouter.get('/', (_req: Request, res: Response) => {
  res.send('Compadreeeee ta buena la response porque ves este mensaje!')
})

server.use('/', rootRouter) // localhost:8000/api/
server.use('/example', exampleRoute) // localhost:8000/api/example
server.use('/auth', authRoute) // localhost:8000/api/auth
server.use('/users', usersRoute) // localhost:8000/api/users

export default server
