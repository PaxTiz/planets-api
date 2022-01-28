import { Request, Response } from 'express'
import planetRepository from '../repositories/planet_repository'
import { Ok } from './controller'

export default {
    async index(req: Request, res: Response) {
        return planetRepository
            .findAll(req.query.galaxy === 'true')
            .then((planets) => Ok(res, planets))
    },
}
