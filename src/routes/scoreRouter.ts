import { createHash } from 'crypto'
import express, { Request, Response , NextFunction, Router } from 'express'
import fs from 'fs'

import { tokens } from '../app'

const scoreRouter: Router = express.Router()

scoreRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        fs.readFile("dist/data/hiscore.txt", { encoding: "utf-8" }, (err, data) => {
            if(err) throw err
            res.send(data)
        })
    } catch(e) {
        next(e)
    }
})

scoreRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        let reqInfo  = req.body
        if(reqInfo.index == undefined) {
            throw new Error("Improper body.")
        }
        let usertoken = JSON.stringify(tokens[reqInfo.index])
        let hashcheck = createHash('sha256').update(usertoken).digest('hex')
        if(hashcheck != reqInfo.token) {
            throw new Error("Token checking failed, will not update score.")
        }
        fs.readFile("dist/data/hiscore.txt", { encoding: "utf-8" }, (err, data) => {
            if(err) throw err
            if(parseInt(data) < reqInfo.score) {
                fs.writeFile("dist/data/hiscore.txt", reqInfo.score.toString(), (err) => {
                    if(err) throw err
                })
            }
        })
        tokens.splice(reqInfo.index, 1)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

export default scoreRouter