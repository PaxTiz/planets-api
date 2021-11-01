import { Response } from "express";

export default abstract class Controller {

	handleResult(res: Response, data: any, status: number = 200, custom: boolean = false): Response {
		if (status === 422 && !custom) {
			// Use to returns errors as same way as express-validator
			const errors = {
				errors: (data as Array<any>).map(e => ({
					param: e.property,
					msg: Object.values(e.constraints)[0]
				}))
			}
			return res.status(422).json(errors)
		}
		else if (data === undefined && !custom) {
			return res.status(404).json({ message: 'Entity not found' })
		} else {
			return res.status(status).json(data)
		}
	}

}
