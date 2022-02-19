import { Request, Response } from 'express'
import service from '../services/planet_service'
import { ServiceResponse } from './controller'

export default {
    async index(req: Request, res: Response) {
        const { galaxy } = req.query
        const response = await service.findAll(galaxy === 'true')
        return ServiceResponse(res, response)
    },
}
