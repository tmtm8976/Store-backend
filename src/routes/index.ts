import { Router } from 'express'
import user from './api/users_route'
import product from './api/products_route'
import order from './api/orders_route'

const route = Router()

route.use('/users', user)
route.use('/products', product)
route.use('/orders', order)


export default route
