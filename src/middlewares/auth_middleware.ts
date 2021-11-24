import { body } from 'express-validator'
import { validate } from './middleware'
import ErrorKeys from '../utils/error_keys'

export default {
	login: [
		body('username')
			.isString()
			.withMessage(ErrorKeys.username_required)
			.trim(),
		body('password')
			.isString()
			.withMessage(ErrorKeys.password_required)
			.trim(),
		validate
	],

	create: [
		body('username')
			.isString()
			.withMessage(ErrorKeys.username_required)
			.isLength({ min: 4, max: 20 })
			.withMessage(ErrorKeys.username_bad_length)
			.trim(),
		body('email')
			.isEmail()
			.withMessage(ErrorKeys.email_invalid)
			.trim(),
		body('password')
			.isString()
			.withMessage(ErrorKeys.password_required)
			.isLength({ min: 8 })
			.withMessage(ErrorKeys.password_too_small)
			.trim(),
		validate
	]
}
