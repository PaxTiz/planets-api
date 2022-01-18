import fs from 'fs'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import Logger from './src/utils/logger'
import ErrorKeys from './src/utils/error_keys'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import 'express-async-errors'

import { isAuth } from './src/middlewares/middleware'
dotenv.config()

const app = express()
const isDevelopment = process.env.APP_ENV === 'development'

Sentry.init({
    dsn: process.env.SENTRY_URL,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
    debug: isDevelopment,
    environment: process.env.APP_ENV,
    attachStacktrace: true,
    autoSessionTracking: true,
})

app.use(Sentry.Handlers.requestHandler({
    user: ['id', 'username',  'email', 'roleId']
}))
app.use(Sentry.Handlers.tracingHandler())

if (isDevelopment) {
    app.use(morgan('dev'))
}

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['*'],
    optionsSuccessStatus: 200
}))
app.use(compression())

app.get('/demo', isAuth, (req, res) => {
    throw Error('My first error');
});

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

app.use(Sentry.Handlers.errorHandler())
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: ErrorKeys.server_error })
})

const port = process.env.PORT || 80
app.listen(port, () => {
    Logger.info('Started server on port ' + port)
})
