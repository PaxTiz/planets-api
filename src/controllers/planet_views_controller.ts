import { Request, Response } from 'express'
import pvRepository from '../repositories/planet_views_repository'
import { Ok } from './controller'

export default {
    async updateOrCreate(req: Request, res: Response) {
        return pvRepository.upsert(parseInt(req.params.planet), req.user.id, req.ip).then((pv) => Ok(res, pv))
    },
}
