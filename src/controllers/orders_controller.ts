import { NextFunction, Request, Response } from 'express'
import { Order } from '../models/orders'
// import jwt from 'jsonwebtoken';

const order_model = new Order()

//create
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await order_model.create(req.body)
        res.json({
            status: 'success',
            data: { ...order },
            message: 'Order Created Successfully',
        })
    } catch (error) {
        next(error)
    }
}

//index
export const index = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await order_model.index()
        res.json({
            message: 'Orders retrived successfully',
            status: 'success',
            body: { ...orders },
        })
    } catch (err) {
        next(err)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await order_model.show(
            req.params.id as unknown as number
        )
        // if(!product==undefined)
        res.json({
            message: 'Order retrived successfully',
            status: 'success',
            body: order,
        })
        // else
        // res.json({
        //     message: `no product of id ${req.params.id}`,
        //     status: 'failed'
        // })
    } catch (err) {
        next(err)
    }
}

//delete
export const delete_product = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await order_model.delete(
            req.params.id as unknown as number
        )
        res.json({
            message: 'Order deleted successfully',
            status: 'success',
            body: order,
        })
    } catch (err) {
        next(err)
    }
}


//get active orders
export const active_orders = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await order_model.active_orders()
        res.json({
            message: 'active orders retrived successfully',
            status: 'success',
            body: {...result},
        })
    } catch (err) {
        next(err)
    }
}

//get complete orders
export const complete_orders = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await order_model.complete_orders()
        res.json({
            message: 'Complete orders retrived successfully',
            status: 'success',
            body: {...products},
        })
    } catch (err) {
        next(err)
    }
}

//add product to order
export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await order_model.addProduct(
            req.body
        )
        res.json({
            message: 'product added to order successfully',
            status: 'success',
            body: {product},
        })
    } catch (err) {
        next(err)
    }
}

// export const authenticate =async (req: Request, res: Response, next : NextFunction) => {
//     try {
//         const { userName, password } = req.body;
//         const user = await user_model.authenticate(userName, password);
//         const token = jwt.sign({user}, config.token_secret as unknown as string);

//         if (!user) {
//             return res.status(401).json({
//                 message: "the user name and password doesn't match, please try again!",
//                 status: "error"
//             });
//         }
//         return res.json({
//             message: "logged in succesfully!",
//             status: "success",
//             body: {...user, token}
//         });
//     } catch (error) {
//         return next(error);
//     }
// }