import { Express, Router } from 'express'
import controller from '../controllers/planet_views_controller'
import middleware from '../middlewares/planet_views_middleware'

module.exports = (app: Express) => {
    const router = Router()
    app.use('/planet-views', router)

    router.patch('/:planet', middleware.updateOrCreate, controller.updateOrCreate)
}
