import { Router } from 'express'
import * as controller from '../../handlers/orders_handler'
import validateToken from '../../middleware/authenticate'

const routes = Router()

routes
    .route('/')
    .get(validateToken, controller.index)
    .post(validateToken, controller.create)
routes
    .route('/:id')
    .get(validateToken, controller.show)
    .delete(validateToken, controller.delete_product)
routes.route('/completed/:id').get(validateToken, controller.complete_orders)
routes.route('/active/:id').get(validateToken, controller.active_orders)
routes.route('/addProduct').post(validateToken, controller.addProduct)

export default routes
