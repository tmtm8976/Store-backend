import { Request, Response} from 'express'
import Error from '../interfaces/error.interface'

const errorMiddleWare = (
    err: Error,
    _req: Request,
    res: Response
) => {
    const status = err.status || 500
    const message = err.message || 'somthing went wrong'

    res.status(status).json({
        status,
        message,
    })
}

export default errorMiddleWare
