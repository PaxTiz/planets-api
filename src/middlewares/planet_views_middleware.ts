import { param } from 'express-validator'
import { isAuth, validate } from './middleware'

export default {
    updateOrCreate: [param('planet').isInt().toInt(), isAuth, validate],
}
