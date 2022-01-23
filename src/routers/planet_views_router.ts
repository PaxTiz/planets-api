import { Router } from 'express'
import PlanetViewsController from '../controllers/planet_views_controller'
import middleware from '../middlewares/planet_views_middleware'

const controller = new PlanetViewsController()
const router = Router()
router.patch('/:planet', middleware.updateOrCreate, controller.updateOrCreate)

module.exports = router
