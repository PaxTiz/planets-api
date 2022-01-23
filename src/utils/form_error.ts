import ErrorKeys from './error_keys'

/**
 * This class is intended to be used for create
 * form errors and returns formatted JSON responses
 * containing information about the bad fields
 */
export default class FormError {
    /**
     * The name of the property
     */
    param: string

    /**
     * Message to display to the user
     */
    msg: ErrorKeys

    constructor(param: string, message: ErrorKeys) {
        this.param = param
        this.msg = message
    }
}
