import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import { readdirSync } from 'fs'
import helmet from 'helmet'
import morgan from 'morgan'
import { join } from 'path'
import Logger from './utils/logger'

interface ApplicationInitializer {
    env: string
}

export default class Application {
    private app: Express
    private isDevelopment: boolean

    constructor(options: ApplicationInitializer) {
        this.initDotenv(options.env)
        this.isDevelopment = process.env.APP_ENV === 'development'

        this.app = express()
        this.initMiddlewares()
        this.initRoutes()
        this.initNotFoundHandler()
        this.initErrorHandler()
    }

    private initDotenv(path: string) {
        dotenv.config({ path })
    }

    private initMiddlewares() {
        if (this.isDevelopment) {
            this.app.use(morgan('dev'))
        }

        this.app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
        this.app.use(compression())
        this.app.use(cookieParser())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())

        const corsOrigins = process.env.CORS_ORIGINS?.split(',')
        if (!corsOrigins) {
            throw Error('Missing CORS origin(s)')
        }

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            for (const origin of corsOrigins) {
                res.setHeader('Access-Control-Allow-Origin', origin)
            }
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type, accept')
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
            )
            return next()
        })
    }

    private initRoutes() {
        readdirSync(join(__dirname, 'routers')).forEach((file) => {
            if (!file.startsWith('_')) {
                const filename = file.split('.')[0]
                const routerIndex = filename.indexOf('_router')
                const routeName = filename.slice(0, routerIndex).replace('_', '-')
                Logger.info(`Mount route '/${routeName}' with router '${filename}'`)
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require(join(__dirname, 'routers', filename))(this.app)
            }
        })
    }

    private initNotFoundHandler() {
        this.app.get('*', (req: Request, res: Response) => {
            return res.status(404).json({ message: 'not_found' })
        })
    }

    private initErrorHandler() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof Error && err.name === 'NotFoundError') {
                return res.status(404).json({ message: 'not_found' })
            } else {
                Logger.error(err)
                return res.status(500).json({ message: 'server_error' })
            }
        })
    }

    public start() {
        const port = process.env.PORT || 80
        this.app.listen(port, () => {
            Logger.info('Started server on port ' + port)
        })
    }
}
