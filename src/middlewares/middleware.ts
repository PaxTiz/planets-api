import { query, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import Utils from '../utils/crypt'
import { user as User } from '@prisma/client'
import userService from '../services/user_service'
import ErrorKeys from '../utils/error_keys'
import { Unauthorized } from '../controllers/controller'

declare global {
    namespace Express {
        interface Request {
            user: User,
            auth: Boolean
        }
    }
}

/**
 * Validate the request by checking if all values
 * from the query, the body and the parameters 
 * are matching rules
 */
export function validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

/**
 * Deny access if no Authorization header is present
 * or JWT token is not valid
 */
export async function isAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.get('authorization')
    if (!header) {
        return Unauthorized(res, ErrorKeys.unauthorized)
    }

    const token = header.split(' ')[1].trim()
    const user = Utils.decodeJWT(token) as any
    if (!user) {
        return Unauthorized(res, ErrorKeys.unauthorized)
    }

    const fromDb = await userService.findOneBy('id', user.id)
    if (!fromDb) {
        return Unauthorized(res, ErrorKeys.unauthorized)
    }
    req.user = fromDb
    req.auth = true
    return next()
}

export const applyCommonFilters = [
    query('limit')
        .optional()
        .isInt()
        .withMessage(ErrorKeys.limit_is_not_a_valid_number)
        .toInt(),
    query('offset')
        .optional()
        .isInt()
        .withMessage(ErrorKeys.offset_is_not_a_valid_number)
        .toInt(),
]
