import { Request, Response } from 'express'
import pvService from '../services/planet_views_service'
import ErrorKeys from '../utils/error_keys'
import { Ok, InternalServerError } from './controller'

export default class PlanetViewsController {

    updateOrCreate = async (req: Request, res: Response) => {
        return pvService.upsert(parseInt(req.params.planet), req.user.id, req.ip)
            .then(pv => Ok(res, pv))
            .catch(() => InternalServerError(res, ErrorKeys.planet_views_save_error))
    }

}
