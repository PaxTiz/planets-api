import { body } from "express-validator"
import { validate } from "./middleware"

export default {
	login: [
		body('username').isString().withMessage('Username is required'),
		body('password').isString().withMessage('Password is required'),
		validate
	],

	create: [
		body('username')
			.isString()
			.withMessage('Username is required')
			.isLength({ min: 4, max: 20 })
			.withMessage('Username length may be between 4 and 20 characters'),
		body('email')
			.isEmail()
			.withMessage('Email is not a valid email address'),
		body('password')
			.isString()
			.withMessage('Password is required')
			.isLength({ min: 8 })
			.withMessage('Password is too small'),
		validate
	]
}
