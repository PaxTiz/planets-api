import { Request, Response } from "express"
import { Ok } from "./controller"
import planetService from "../services/planet_service"
import { write } from "../utils/cache"

export default class PlanetController {

    index = async (req: Request, res: Response) => {
        return planetService.findAll(req.query.galaxy === 'true')
            .then(planets => {
                write(req.originalUrl, planets, 1)
                return Ok(res, planets)
            })
    }

}
