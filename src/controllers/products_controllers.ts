import { NextFunction, Request, Response } from 'express'
import { product, Product } from '../models/products'
import { user  } from '../models/users'
import jwt from 'jsonwebtoken';

const product_model = new Product()

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    try {
        jwt.verify(req.body.token , process.env.TOKEN_SECRET as unknown as string)
    } catch (error) {
        res.status(410)
        res.json(`Invalid token ${error}`)
        return
    }

    try {
        const newproduct : product = {
            name : req.body.name ,
            price : req.body.price ,
            category: req.body.category

        }
        const product = await product_model.create(newproduct)
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Product Created Successfully',
        })
    } catch (error) {
        next(error)
    }
}

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
            body: { ...products },
        })
    } catch (err) {
        next(err)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await product_model.show(
            req.params.id as unknown as string
        )
        // if(!product==undefined)
        res.json({
            message: 'product retrived successfully',
            status: 'success',
            body: product,
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
        const product = await product_model.delete(
            req.params.id as unknown as string
        )
        res.json({
            message: 'Product deleted successfully',
            status: 'success',
            body: product,
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
            req.params.category as unknown as string
        )
        res.json({
            message: `Products of category ${req.params.category} retrived successfully`,
            status: 'success',
            body: {...product},
        })
    } catch (err) {
        next(err)
    }
}

//get top five popular products
export const popular = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await product_model.popular()
        res.json({
            message: `Our top  five most popular product: `,
            status: 'success',
            body: {...products},
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
