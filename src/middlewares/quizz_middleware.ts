import { applyCommonFilters, validate } from './middleware'

export default {
    findAll: [...applyCommonFilters, validate],
}
