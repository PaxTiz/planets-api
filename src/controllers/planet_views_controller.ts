import { Request, Response } from 'express'
import service from '../services/planet_views_service'
import { ServiceResponse } from './controller'

export default {
    async updateOrCreate(req: Request, res: Response) {
        const { planet } = req.params
        const response = await service.upsert(parseInt(planet), req.user.id, req.ip)
        return ServiceResponse(res, response)
    },
}
