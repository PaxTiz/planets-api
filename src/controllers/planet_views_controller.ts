import { Request, Response } from 'express'
import pvService from '../services/planet_views_service'
import ErrorKeys from '../utils/error_keys'
import Controller from './controller'

export default class PlanetViewsController extends Controller {

    updateOrCreate = async (req: Request, res: Response) => {
        const pv = await pvService.upsert(parseInt(req.params.planet), req.user.id, req.ip)
        if (pv) {
            return this.handleResult(res, { pv }, 200)
        }

        return this.handleResult(res, { message: ErrorKeys.planet_views_save_error }, 500)
    }

}
