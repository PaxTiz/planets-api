import { Router } from 'express'
import controller from '../controllers/planet_controller'
import middleware from '../middlewares/planet_middleware'

const router = Router()
router.get('/', middleware.findAll, controller.index)

module.exports = router
