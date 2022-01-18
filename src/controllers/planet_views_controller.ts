import { Request, Response } from 'express'
import { Ok } from './controller'
import pvService from '../services/planet_views_service'

export default class PlanetViewsController {

    updateOrCreate = async (req: Request, res: Response) => {
        return pvService.upsert(parseInt(req.params.planet), req.user.id, req.ip)
            .then(pv => Ok(res, pv))
    }

}
