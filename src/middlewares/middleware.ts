import { validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"
import Utils from "../utils/crypt"
import { user as User } from "@prisma/client"
import userService from "../services/user_service"

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
    const error = { message: 'Unauthorized' }
    const header = req.get('authorization')
    if (!header) {
        return res.status(401).json(error)
    }

    const token = header.split(' ')[1].trim()
    const user = Utils.decodeJWT(token) as any
    if (!user) {
        return res.status(401).json(error)
    }

    const fromDb = await userService.findOneBy('id', user.id)
    if (!fromDb) {
        return res.status(401).json(error)
    }
    req.user = fromDb
    req.auth = true
    return next()
}
