import { Request, Response } from "express"
import Controller from "./controller"
import userService from "../services/user_service"
import Utils from "../utils/crypt"
import FormError from '../utils/form_error'

export default class AuthController extends Controller {

	login = async (req: Request, res: Response): Promise<Response> => {
		/** A user exists wth given username ? */
		const user = await userService.findOneBy('username', req.body.username)
		if (!user) {
			return this.handleResult(res, { message: "Invalid username" }, 400)
		}

		/** If a user exists, is the password correct ? */
		const isValidPassword = await Utils.validateBcrypt(req.body.password, user.password)
		if (!isValidPassword) {
			return this.handleResult(res, { message: "Invalid password" }, 400)
		}

		return this.handleResult(res, {
			user: { ...user, password: null },
			token: Utils.generateJwtToken({ id: user.id })
		})
	}

	create = async (req: Request, res: Response): Promise<Response> => {
		const errors = []
		/** Is the username already taken ? */
		const username = await userService.exists('username', req.body.username)
		if (username) {
			errors.push(new FormError(
				'username',
				"Username is already in use"
			))
		}

		/** Is the email already taken ? */
		const email = await userService.exists('email', req.body.email)
		if (email) {
			errors.push(new FormError(
				'email',
				"Email is already in use"
			))
		}

		if (errors.length > 0) {
			return this.handleResult(res, { 'errors': errors }, 422, true)
		}

		const user = {
			username: req.body.username,
			email: req.body.email,
			password: await Utils.crypt(req.body.password),
		}

		/** Insert user and returns data with JWT token */
		return userService.create(user).then(inserted => {
			return this.handleResult(res, {
				user: { ...inserted, password: null },
				token: Utils.generateJwtToken({ id: inserted.id })
			}, 201)
		}).catch(() => {
			return this.handleResult(res, {
				message: "Can't create user"
			}, 500)
		})
	}

}
