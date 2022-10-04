import { NextFunction, Request, Response } from 'express'
import { Order } from '../models/orders'

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
            order: order,
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
            orders: [...orders],
        })
    } catch (err) {
        next(err)
    }
}

//show
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await order_model.show(req.params.id as unknown as number)
        res.json({
            message: 'Order retrived successfully',
            status: 'success',
            order: order,
        })
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
            order: order,
        })
    } catch (err) {
        next(err)
    }
}

//get active orders
export const active_orders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await order_model.active_orders(
            req.params.id as unknown as number
        )
        res.json({
            message: 'active orders retrived successfully',
            status: 'success',
            orders: [...result],
        })
    } catch (err) {
        next(err)
    }
}

// get complete orders
export const complete_orders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await order_model.complete_orders(
            req.params.id as unknown as number
        )
        res.json({
            message: 'Complete orders retrived successfully',
            status: 'success',
            orders: [...orders],
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
        const product = await order_model.addProduct(req.body)
        res.json({
            message: 'product added to order successfully',
            status: 'success',
            product: product,
        })
    } catch (err) {
        next(err)
    }
}
