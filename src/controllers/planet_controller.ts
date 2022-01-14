import { Request, Response } from "express"
import { FormatResponse, Ok } from "./controller"
import planetService from "../services/planet_service"

export default class PlanetController {

    index = async (req: Request, res: Response) => {
        return planetService.findAll(req.query.galaxy === 'true')
            .then(planets => Ok(res, FormatResponse(planets)))
    }

}
