import { Request, Response } from 'express'
import quizzRepository from '../services/quizz_service'
import { Ok } from './controller'

export default {
    async index(req: Request, res: Response) {
        return quizzRepository.findAll().then((quizz) => Ok(res, quizz))
    },

    async findCategories(req: Request, res: Response) {
        return quizzRepository.findAllCategories().then((categories) => Ok(res, categories))
    },
}
