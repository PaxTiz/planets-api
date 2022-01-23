import { Response } from 'express'
import ErrorKey from '../utils/error_keys'
import FormError from '../utils/form_error'

interface HttpResponse {
    message: ErrorKey | null
    data: Object | Array<any> | string
}

/**
 * Format a json response that will be send
 * to the client
 *
 * @param data data to return in the response body
 * @param message message to send with the body
 * @returns response with specified status code and formatted body
 */
const FormatResponse = (data: any, message: ErrorKey | null = null): HttpResponse => {
    return {
        message,
        data,
    }
}

/**
 * Handle any response with custom status code.
 * Use it only when status code is 200 <= `code` < 400
 *
 * @param res express response getting from the router
 * @param data formatted data with `FormatResponse` function
 * @param status the status code associated to the response, 200 by default
 * @returns response with specified status code and formatted body
 */
export function Ok(res: Response, data: any, status = 200) {
    return res.status(status).json(FormatResponse(data))
}

/**
 * Handle a 400 status.
 * Use it when data passed in the request are invalid
 *
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with 400 status code and formatted error
 */
export function BadRequest(res: Response, message: ErrorKey) {
    return res.status(400).json(FormatResponse(null, message))
}

/**
 * Handle a 401 status.
 * Use it when user is not logged
 *
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with 401 status code and formatted error
 */
export function Unauthenticated(res: Response) {
    return res.status(401).json(FormatResponse(null, ErrorKey.unauthenticated))
}

/**
 * Handle a 403 status.
 * Use it when user is not authorized to access to something
 *
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with 401 status code and formatted error
 */
export function Forbidden(res: Response) {
    return res.status(403).json(FormatResponse(null, ErrorKey.forbidden))
}

/**
 * Handle a 422 status.
 * Use it when request body cannot be used as expected (eg. missing data when submitting a form)
 *
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with 422 status code and formatted errors
 */
export function UnprocessableEntity(res: Response, errors: Array<FormError> | ErrorKey) {
    return res.status(422).json(FormatResponse(errors, null))
}

/**
 * Handle a 500 status.
 * Use it when an error that should never happend is thrown
 *
 * @param res express response getting from the router
 * @param error a key representing an error that should never happend in normal conditions
 * @returns response with 500 status code and formatted error
 */
export function InternalServerError(res: Response, error: ErrorKey): Response {
    return res.status(500).json(FormatResponse(null, error))
}
