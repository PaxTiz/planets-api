import { Request, Response } from 'express'
import { FormatResponse, Unauthorized, UnprocessableEntity, InternalServerError } from './controller'
import userService from '../services/user_service'
import Utils from '../utils/crypt'
import FormError from '../utils/form_error'
import ErrorKeys from '../utils/error_keys'

export default class AuthController {

	login = async (req: Request, res: Response): Promise<Response> => {
		/** A user exists wth given username ? */
		const user = await userService.findOneBy('username', req.body.username)
		if (!user) {
			return Unauthorized(res, ErrorKeys.username_not_found)
		}

		/** If a user exists, is the password correct ? */
		const isValidPassword = await Utils.validateBcrypt(req.body.password, user.password)
		if (!isValidPassword) {
			return Unauthorized(res, ErrorKeys.password_not_match)
		}

		return res.json(FormatResponse({
			user: { ...user, password: null },
			token: Utils.generateJwtToken({ id: user.id })
		}))
	}

	create = async (req: Request, res: Response): Promise<Response> => {
		const errors = []
		/** Is the username already taken ? */
		const username = await userService.exists('username', req.body.username)
		if (username) {
			errors.push(new FormError('username', ErrorKeys.username_alredy_in_use))
		}

		/** Is the email already taken ? */
		const email = await userService.exists('email', req.body.email)
		if (email) {
			errors.push(new FormError('email', ErrorKeys.email_alredy_in_use))
		}

		if (errors.length > 0) {
			return UnprocessableEntity(res, errors)
		}

		const user = {
			username: req.body.username,
			email: req.body.email,
			password: await Utils.crypt(req.body.password),
		}

		/** Insert user and returns data with JWT token */
		return userService.create(user).then(inserted => {
			return res.status(201).json(FormatResponse({
				user: { ...inserted, password: null },
				token: Utils.generateJwtToken({ id: inserted.id })
			}))
		}).catch(() => {
			return InternalServerError(res, ErrorKeys.user_save_error)
		})
	}

}
