import { Request, Response } from 'express'
import { Ok } from './controller'
import quizzRepository from '../repositories/quizz_repository'

export default class QuizzController {
    index = async (req: Request, res: Response) => {
        return quizzRepository.findAll().then((quizz) => Ok(res, quizz))
    }

    findCategories = async (req: Request, res: Response) => {
        return quizzRepository.findAllCategories().then((categories) => Ok(res, categories))
    }
}
