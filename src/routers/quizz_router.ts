import { Express, Router } from 'express'
import controller from '../controllers/quizz_controller'
import middleware from '../middlewares/quizz_middleware'

module.exports = (app: Express) => {
    const router = Router()
    app.use('/quizz', router)

    router.get('/', middleware.findAll, controller.index)
    router.get('/categories', middleware.findAll, controller.findCategories)
}
