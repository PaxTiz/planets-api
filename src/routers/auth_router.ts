import { Router } from 'express'
import middleware from '../middlewares/auth_middleware'
import Controller from '../controllers/auth_controller'

const controller = new Controller()
const router = Router()
router.post('/login', middleware.login, controller.login)
router.post('/register', middleware.create, controller.create)

module.exports = router
