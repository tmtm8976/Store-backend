import { Router } from 'express'
import * as controller from '../../handlers/products_handler'
import validateToken from '../../middleware/authenticate'

const routes = Router()

routes.route('/').get(controller.index).post(validateToken, controller.create)
routes.route('/popular').get(controller.popular)
routes
    .route('/:id')
    .get(controller.show)
    .delete(validateToken, controller.delete_product)
routes.route('/category/:cate').get(controller.category)

export default routes
