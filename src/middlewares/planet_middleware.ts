import { query } from 'express-validator'
import ErrorKeys from '../utils/error_keys'
import cache from '../utils/cache'
import { validate } from './middleware'

export default {

    findAll: [
        query('galaxy')
            .optional()
            .isBoolean()
            .withMessage(ErrorKeys.planets_middleware_galaxy_boolean),
        cache,
        validate
    ]

}
