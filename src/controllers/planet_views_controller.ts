import { Request, Response } from 'express'
import { Ok } from './controller'
import pvRepository from '../repositories/planet_views_repository'

export default class PlanetViewsController {
    updateOrCreate = async (req: Request, res: Response) => {
        return pvRepository.upsert(parseInt(req.params.planet), req.user.id, req.ip).then((pv) => Ok(res, pv))
    }
}
