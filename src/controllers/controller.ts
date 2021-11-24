import { Response } from 'express'
import ErrorKey from '../utils/error_keys'
import FormError from '../utils/form_error'

export function handleResult(res: Response, data: any, status: number = 200, custom: boolean = false): Response {
	if (status === 422 && !custom) {
		// Use to returns errors as same way as express-validator
		const errors = {
			errors: (data as Array<any>).map(e => ({
				param: e.property,
				msg: Object.values(e.constraints)[0]
			}))
		}
		return res.status(422).json(errors)
	}
	else if (!data && !custom) {
		return res.status(404).json({ message: ErrorKey.not_found })
	} else {
		return res.status(status).json(data)
	}
}

/**
 * Handle a 200 status.
 * Use it when status code is a success (200, 201 or 204)
 * 
 * @param res express response getting from the router
 * @param data data to return in the response body
 * @param message message to send with the body
 * @param status status code of the response
 * @returns response with specified status code and formatted body
 */
export function Ok(res: Response, data: any, message: string | null = null, status: number = 200): Response {
	return res.status(status).json({
		message,
		data
	})
}

/**
 * Handle a 400 status.
 * Use it when data passed in the request are invalid
 * 
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with specified status code and formatted body
 */
export function BadRequest(res: Response, message: ErrorKey) {
	return res.status(400).json({ message })
}

/**
 * Handle a 401 status.
 * Use it when user is not authorized to access to something
 * 
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with specified status code and formatted body
 */
 export function Unauthorized(res: Response, message: ErrorKey | null = null) {
	return res.status(401).json({ message })
}

/**
 * Handle a 422 status.
 * Use it when request body cannot be used as expected (eg. missing data when submitting a form)
 * 
 * @param res express response getting from the router
 * @param message a key representing what is invalid
 * @returns response with specified status code and formatted body
 */
 export function UnprocessableEntity(res: Response, errors: Array<FormError>) {
	return res.status(422).json({ errors })
}

/**
 * Handle a 500 status.
 * Use it when an error that should never happend is thrown
 * 
 * @param res express response getting from the router
 * @param error a key representing an error that should never happend in normal conditions
 * @returns response with specified status code and formatted body
 */
 export function InternalServerError(res: Response, error: ErrorKey): Response {
	return res.status(500).json({ error })
}
