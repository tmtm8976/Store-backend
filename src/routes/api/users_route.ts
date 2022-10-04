import { Router } from 'express'
import * as controller from '../../handlers/users_handler'
import validateToken from '../../middleware/authenticate'

const routes = Router()

routes.route('/').get(validateToken, controller.index).post(controller.create)
routes
    .route('/:id')
    .get(validateToken, controller.show)
    .delete(validateToken, controller.delete_user)

routes.post('/authenticate', controller.authenticate)

export default routes
