import { Request, Response } from "express"
import { Ok, InternalServerError } from "./controller"
import planetService from "../services/planet_service"
import ErrorKeys from "../utils/error_keys"

export default class PlanetController {

    index = async (req: Request, res: Response) => {
        return planetService.findAll(req.query.galaxy === 'true')
            .then(planets => Ok(res, planets))
            .catch(() => InternalServerError(res, ErrorKeys.planets_find_all_error))
    }

}
