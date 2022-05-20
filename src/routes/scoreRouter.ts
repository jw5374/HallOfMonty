import express, { Request, Response , NextFunction, Router } from 'express'
import fs from 'fs'

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
        fs.writeFile("dist/data/hiscore.txt", req.body, (err) => {
            if(err) throw err
        })
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

export default scoreRouter