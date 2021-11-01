import { Request, Response } from "express";
import Controller from "./controller";
import planetService from "../services/planet_service";

export default class PlanetController extends Controller {

    index = async (req: Request, res: Response) => {
        const planets = await planetService.findAll()
        return this.handleResult(res, planets)
    }

}
