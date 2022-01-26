import { Router } from 'express'
import controller from '../controllers/quizz_controller'
import middleware from '../middlewares/quizz_middleware'

const router = Router()
router.get('/', middleware.findAll, controller.index)
router.get('/categories', middleware.findAll, controller.findCategories)

module.exports = router
