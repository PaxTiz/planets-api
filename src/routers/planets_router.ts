import { Router } from "express"
import PlanetController from "../controllers/planet_controller"

const controller = new PlanetController()
const router = Router()
router.get('/', controller.index)

module.exports = router
