import { Router } from 'express'
import controller from '../controllers/auth_controller'
import middleware from '../middlewares/auth_middleware'

const router = Router()
router.post('/login', middleware.login, controller.login)
router.post('/register', middleware.create, controller.create)

module.exports = router
