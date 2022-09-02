import Utils from '../utils/crypt'
import FormError from '../utils/form_error'
import userService from './users_service'

export default {
    async login(username: string, password: string) {
        const user = await userService.findOneBy('username', username)
        if (!user) {
            return new FormError('username', 'username_not_found')
        }

        const isValidPassword = await Utils.validateBcrypt(password, user.password)
        if (!isValidPassword) {
            return new FormError('password', 'password_not_match')
        }

        return {
            user: userService.safeUser(user),
            token: Utils.generateJwtToken({ id: user.id }),
        }
    },

    async create(username: string, password: string, email: string) {
        const errors = []

        const usernameExists = await userService.exists('username', username)
        if (usernameExists) {
            errors.push(new FormError('username', 'username_alredy_in_use'))
        }

        const emailExists = await userService.exists('email', email)
        if (emailExists) {
            errors.push(new FormError('email', 'email_alredy_in_use'))
        }

        if (errors.length > 0) {
            return errors
        }

        return userService
            .create({ username, email, password: await Utils.crypt(password) })
            .then((inserted) => ({
                user: userService.safeUser(inserted),
                token: Utils.generateJwtToken({ id: inserted.id }),
            }))
    },
}
