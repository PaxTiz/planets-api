import fs from 'fs'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import Logger from './src/utils/logger'
import ErrorKeys from './src/utils/error_keys'
dotenv.config()

const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
    credentials: true,
    origin: ['*'],
    optionsSuccessStatus: 200
}))
app.use(compression())
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: ErrorKeys.server_error })
})

fs.readdirSync('./src/routers').forEach((file) => {
    if (!file.startsWith('_')) {
        const filename = file.split('.')[0]
        const routerIndex = filename.indexOf('_router')
        const routeName = filename.slice(0, routerIndex).replace('_', '-')
        Logger.info(`Mount route '/${routeName}' with router '${filename}'`)
        app.use(`/${routeName}`, require(`./src/routers/${filename}`))
    }
})

app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Page not found' })
})

const port = process.env.PORT || 80
app.listen(port, () => {
    Logger.info('Started server on port ' + port)
})
