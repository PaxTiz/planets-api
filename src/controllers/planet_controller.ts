import { Request, Response } from 'express'
import planetService from '../services/planet_service'
import { Ok } from './controller'

export default class PlanetController {
    index = async (req: Request, res: Response) => {
        return planetService.findAll(req.query.galaxy === 'true').then((planets) => Ok(res, planets))
    }
}
