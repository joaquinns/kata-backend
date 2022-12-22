import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET as string

/**
 *
 * @param { Request } req Original request previous to the jwt verify token middleware
 * @param { Response } res Response to the jwt token verification
 * @param { NextFunction } next Next function to indicate all is ok
 * @returns Error of verification or next function execution
 */

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check header of req: x-acces-token
  let jwtToken = req.headers['x-access-token'] as string

  if (!jwtToken) {
    return res.status(403).send({
      authenticationError: 'Missing or not valid token',
      message: 'Unauthorized'
    })
  }

  // verify the token
  jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'Req failed',
        message: 'Unauthorized'
      })
    }
    // verify ok
    // req.userId = decoded.id
    next()
  })
}
