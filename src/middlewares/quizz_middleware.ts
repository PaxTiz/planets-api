import { query } from 'express-validator'
import ErrorKeys from '../utils/error_keys'
import { applyCommonFilters, validate } from './middleware'

export default {
    findAll: [...applyCommonFilters, validate],
}
