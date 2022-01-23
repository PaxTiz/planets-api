import { Request, Response } from 'express'
import { Ok } from './controller'
import quizzService from '../services/quizz_service'

export default class QuizzController {
    index = async (req: Request, res: Response) => {
        return quizzService.findAll().then((quizz) => Ok(res, quizz))
    }

    findCategories = async (req: Request, res: Response) => {
        return quizzService.findAllCategories().then((categories) => Ok(res, categories))
    }
}
