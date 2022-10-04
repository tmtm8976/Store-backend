import { NextFunction, Request, Response } from 'express'
import { Product } from '../models/products'

const product_model = new Product()

//create
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await product_model.create(req.body)
        res.json({
            status: 'success',
            product: product,
            message: 'Product Created Successfully',
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
        const products = await product_model.index()
        res.json({
            message: 'Products retrived successfully',
            status: 'success',
            products: [...products],
        })
    } catch (err) {
        next(err)
    }
}

//show
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await product_model.show(
            req.params.id as unknown as string
        )
        res.json({
            message: 'product retrived successfully',
            status: 'success',
            product: product,
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
        const product = await product_model.delete(
            req.params.id as unknown as string
        )
        res.json({
            message: 'Product deleted successfully',
            status: 'success',
            product: product,
        })
    } catch (err) {
        next(err)
    }
}

//get products of the same category
export const category = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await product_model.category(
            req.params.cate as unknown as string
        )
        res.json({
            message: `Products of category ${req.params.cate} retrived successfully`,
            status: 'success',
            products: [...product],
        })
    } catch (err) {
        next(err)
    }
}

//get top five popular products
export const popular = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await product_model.popular()
        res.json({
            message: `Our top  five most popular product: `,
            status: 'success',
            products: [...products],
        })
    } catch (err) {
        next(err)
    }
}
