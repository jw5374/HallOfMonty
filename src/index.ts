import express, { Application } from 'express'
import helmet from 'helmet'

import * as errFuncs from './errorHandlers/errorFuncs'
import score from './routes/scoreRouter'

const app: Application = express()

app.use(helmet())
app.use(express.text())

app.use('/', express.static('src/public', { extensions: ["html", "htm"] }))
app.use('/hiscore', score)

// error handlers (using next(error) to pass on errors)
app.use(errFuncs.logErrors)
app.use(errFuncs.clientErrorHandler)
app.use(errFuncs.errorHandler)

export { app }
