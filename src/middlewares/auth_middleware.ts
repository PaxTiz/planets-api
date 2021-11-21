import { body } from 'express-validator'
import { validate } from './middleware'
import ErrorKeys from '../utils/error_keys'

export default {
	login: [
		body('username')
			.isString()
			.withMessage(ErrorKeys.username_required),
		body('password')
			.isString()
			.withMessage(ErrorKeys.password_required),
		validate
	],

	create: [
		body('username')
			.isString()
			.withMessage(ErrorKeys.username_required)
			.isLength({ min: 4, max: 20 })
			.withMessage(ErrorKeys.username_bad_length),
		body('email')
			.isEmail()
			.withMessage(ErrorKeys.email_invalid),
		body('password')
			.isString()
			.withMessage(ErrorKeys.password_required)
			.isLength({ min: 8 })
			.withMessage(ErrorKeys.password_too_small),
		validate
	]
}
