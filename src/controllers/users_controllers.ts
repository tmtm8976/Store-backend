import { NextFunction, Request, Response } from 'express'
import { user, userModel } from '../models/users'
import jwt from 'jsonwebtoken';

const user_model = new userModel()

//create
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newuser = await user_model.create(req.body)
        var token = jwt.sign({user: newuser},process.env.TOKEN_SECRET as unknown as string)
        res.json({
            status: 'success',
            data: {token},
            message: 'User Created Successfully',
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
        const users = await user_model.index()
        res.json({
            message: 'users retrived successfully',
            status: 'success',
            body: { ...users },
        })
    } catch (err) {
        next(err)
    }
}

//show
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await user_model.show(req.params.id as unknown as string)
        res.json({
            message: 'user retrived successfully',
            status: 'success',
            body: user,
        })
    } catch (err) {
        next(err)
    }
}

//delete
export const delete_user = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await user_model.delete(req.params.id as unknown as string)
        res.json({
            message: 'user deleted successfully',
            status: 'success',
            body: user,
        })
    } catch (err) {
        next(err)
    }
}


//authenticate
export const authenticate =async (req: Request, res: Response, next : NextFunction) => {
    try {
        const { id, password } = req.body;
        const user = await user_model.authenticate(id, password);
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);

        if (!user) {
            return res.status(401).json({
                message: "the id and password doesn't match, please try again!",
                status: "error"
            });
        }
        return res.json({
            message: "logged in succesfully!",
            status: "success",
            body: {...user, token}
        });
    } catch (error) {
        return next(error);
    }
}