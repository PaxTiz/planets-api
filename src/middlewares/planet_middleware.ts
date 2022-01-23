import { query } from 'express-validator'
import ErrorKeys from '../utils/error_keys'
import { validate, isAuth } from './middleware'

export default {
    findAll: [
        isAuth,
        query('galaxy').optional().isBoolean().withMessage(ErrorKeys.planets_middleware_galaxy_boolean),
        validate,
    ],
}
