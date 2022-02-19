import userRepository from '../repositories/user_repository'
import Utils from '../utils/crypt'
import ErrorKeys from '../utils/error_keys'
import FormError from '../utils/form_error'

export default {
    async login(username: string, password: string) {
        const user = await userRepository.findOneBy('username', username)
        if (!user) {
            return new FormError('username', ErrorKeys.username_not_found)
        }

        const isValidPassword = await Utils.validateBcrypt(password, user.password)
        if (!isValidPassword) {
            return new FormError('password', ErrorKeys.password_not_match)
        }

        return {
            user: { ...user, password: undefined },
            token: Utils.generateJwtToken({ id: user.id }),
        }
    },

    async create(username: string, password: string, email: string) {
        const errors = []
        /** Is the username already taken ? */
        const usernameExists = await userRepository.exists('username', username)
        if (usernameExists) {
            errors.push(new FormError('username', ErrorKeys.username_alredy_in_use))
        }

        /** Is the email already taken ? */
        const emailExists = await userRepository.exists('email', email)
        if (emailExists) {
            errors.push(new FormError('email', ErrorKeys.email_alredy_in_use))
        }

        if (errors.length > 0) {
            return errors
        }

        const user = { username, email, password: await Utils.crypt(password) }

        /** Insert user and returns data with JWT token */
        return userRepository.create(user).then((inserted) => ({
            user: { ...inserted, password: undefined },
            token: Utils.generateJwtToken({ id: inserted.id }),
        }))
    },
}
