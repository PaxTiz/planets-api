import { query } from 'express-validator'
import ErrorKeys from '../utils/error_keys'
import { validate } from './middleware'

export default {

    findAll: [
        query('galaxy')
            .optional()
            .isBoolean()
            .withMessage(ErrorKeys.planets_middleware_galaxy_boolean),
        validate
    ]

}
