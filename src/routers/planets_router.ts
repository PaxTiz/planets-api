import { Router } from 'express'
import PlanetController from '../controllers/planet_controller'
import middleware from '../middlewares/planet_middleware'

const controller = new PlanetController()
const router = Router()
router.get('/', middleware.findAll, controller.index)

module.exports = router
