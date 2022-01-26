import { Request, Response } from 'express'
import userRepository from '../repositories/user_repository'
import Utils from '../utils/crypt'
import ErrorKeys from '../utils/error_keys'
import FormError from '../utils/form_error'
import { Ok, UnprocessableEntity } from './controller'

const login = async (req: Request, res: Response): Promise<Response> => {
    /** A user exists wth given username ? */
    const user = await userRepository.findOneBy('username', req.body.username)
    if (!user) {
        return UnprocessableEntity(res, ErrorKeys.username_not_found)
    }

    /** If a user exists, is the password correct ? */
    const isValidPassword = await Utils.validateBcrypt(req.body.password, user.password)
    if (!isValidPassword) {
        return UnprocessableEntity(res, ErrorKeys.password_not_match)
    }

    return Ok(res, {
        user: { ...user, password: null },
        token: Utils.generateJwtToken({ id: user.id }),
    })
}

const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = []
    /** Is the username already taken ? */
    const username = await userRepository.exists('username', req.body.username)
    if (username) {
        errors.push(new FormError('username', ErrorKeys.username_alredy_in_use))
    }

    /** Is the email already taken ? */
    const email = await userRepository.exists('email', req.body.email)
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
    return userRepository.create(user).then((inserted) => {
        return Ok(
            res,
            {
                user: { ...inserted, password: null },
                token: Utils.generateJwtToken({ id: inserted.id }),
            },
            201,
        )
    })
}

export default {
    login,
    create,
}
