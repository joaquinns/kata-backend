import { UserType } from '@/controllers/types'
import bcrypt from 'bcrypt'
import express, { Request, Response } from 'express'
import { AuthController } from '../controllers/auth.controller'

const authRoute = express.Router()

const authController = new AuthController()

authRoute.route('/register').post(async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)
  const newUser: UserType = {
    name,
    email,
    password: passwordHash
  }
  const response = await authController.registerUser(newUser)
  return res.status(201).json(response)
})

authRoute.route('/login').post(async (req: Request, res: Response) => {
  const {email, password} = req.body
  const auth = {
    email,
    password
  }
  const response = await authController.loginUser(auth)
  return res.json(response)
})

export default authRoute
