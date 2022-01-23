import { param } from 'express-validator'
import { isAuth, validate } from './middleware'
import ErrorKeys from '../utils/error_keys'

export default {
    updateOrCreate: [param('planet').isInt().withMessage(ErrorKeys.planet_id_missing).toInt(), isAuth, validate],
}
