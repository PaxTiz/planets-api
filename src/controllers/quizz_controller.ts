import { Request, Response } from "express"
import { Ok, InternalServerError } from "./controller"
import quizzService from "../services/quizz_service"
import ErrorKeys from "../utils/error_keys"

export default class QuizzController {

    index = async (req: Request, res: Response) => {
        return quizzService.findAll()
            .then(quizz => Ok(res, quizz))
            .catch(() => InternalServerError(res, ErrorKeys.quizz_find_all_error))
    }

    findCategories = async (req: Request, res: Response) => {
        return quizzService.findAllCategories()
            .then(categories => Ok(res, categories))
            .catch(() => InternalServerError(res, ErrorKeys.quizz_categories_find_all_error))
    }

}
