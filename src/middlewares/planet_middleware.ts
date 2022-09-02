import { query } from 'express-validator'
import { isAuth, validate } from './middleware'

export default {
    findAll: [isAuth, query('galaxy').optional().isBoolean(), validate],
}
