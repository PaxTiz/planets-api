import { body } from "express-validator"
import { validate } from "./middleware"

export default {
	login: [
		body('username').isString(),
		body('password').isString(),
		validate
	],

	create: [
		body('username').isString().isLength({ min: 4, max: 20 }),
		body('email').isEmail(),
		body('password')
			.isString()
			.isLength({ min: 8 })
			.withMessage('Le mot de passe doit faire au moins 8 caractères'),
		validate
	]
}
