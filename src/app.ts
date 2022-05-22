import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
import express, { Application, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'

import * as errFuncs from './errorHandlers/errorFuncs'
import score from './routes/scoreRouter'

const app: Application = express()
const keychecks = process.env.KEYSCHECK?.split(',')
let tokens: JSON[] = []

app.use(helmet())
app.use(express.text())
app.use(express.json())

app.post('/event', (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!keychecks) {
            res.end()
            return
        }
        for(let key of keychecks) {
            if(!Object.keys(req.body).includes(key)) {
                throw new Error("Potentially not requesting from application website, key checks failed.")
            }
        }
        tokens.push(req.body)
        let hashedtoken = createHash('sha256').update(JSON.stringify(req.body)).digest('hex')
        res.send([hashedtoken, tokens.length-1])
    } catch (err) {
        next(err)
    }
})

app.use('/', express.static('dist/public', { extensions: ["html", "htm"] }))
app.use('/hiscore', score)

// error handlers (using next(error) to pass on errors)
app.use(errFuncs.logErrors)
app.use(errFuncs.clientErrorHandler)
app.use(errFuncs.errorHandler)

export { app, tokens }
