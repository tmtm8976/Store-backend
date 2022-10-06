import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import error from '../interfaces/error.interface'
import config from '../config'

const handelError = (next: NextFunction) => {
    const err: error = new Error('Login Error: please try again')
    err.status = 401
    next(err)
}

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
    try {
        //get header
        const authHeader = req.get('Authorization')

        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase()
            const token = authHeader.split(' ')[1]

            if (token && bearer === 'bearer') {
                const decode = jwt.verify(
                    token,
                    config.token as unknown as string
                )
                if (decode) {
                    next()
                } else {
                    handelError(next)
                }
            } else {
                handelError(next)
            }
        } else {
            handelError(next)
        }
    } catch (error) {
        handelError(next)
    }
}

export default validateToken
