import { Router } from 'express'
import * as controller from '../../controllers/orders_controller'
// import validateToken from "../../middleware/authenticate";

const route = Router()

route.route('/').post(controller.create)
const routes = Router()

// routes.route('/').get(validateToken, controller.index).post(controller.create);
routes.route('/').get(controller.index).post(controller.create)
routes.route('/:id').get(controller.show).delete(controller.delete_product)
routes.route('/completed/:completed').get(controller.complete_orders)
routes.route('/active/:active').get(controller.active_orders)
routes.route('/addProduct/:add').post(controller.addProduct)



// routes.post('/authenticate', controller.authenticate);

export default routes