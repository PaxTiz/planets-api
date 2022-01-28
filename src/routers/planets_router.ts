import { Express, Router } from 'express'
import controller from '../controllers/planet_controller'
import middleware from '../middlewares/planet_middleware'

module.exports = (app: Express) => {
    const router = Router()
    app.use('/planets', router)

    router.get('/', middleware.findAll, controller.index)
}
