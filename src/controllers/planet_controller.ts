import { Request, Response } from 'express'
import service, { FindAllInterface } from '../services/planet_service'
import { ServiceResponse } from './controller'

export default {
    async index(req: Request, res: Response) {
        const params = req.query as FindAllInterface
        const response = await service.findAll(params)
        return ServiceResponse(res, response)
    },
}
