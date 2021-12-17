import { Router } from 'express'
import QuizzController from '../controllers/quizz_controller'
import middleware from '../middlewares/quizz_middleware'

const controller = new QuizzController()
const router = Router()
router.get('/', middleware.findAll, controller.index)
router.get('/categories', middleware.findAll, controller.findCategories)

module.exports = router
