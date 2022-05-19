import { Request, Response, NextFunction } from "express"

function logErrors(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error.stack)
    next(error)
}

function clientErrorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(error)
    }
}

function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500)
    res.send(`${error.name}: ${error.message} <br> <br> ${JSON.stringify(error)}`)
}

export { logErrors, clientErrorHandler, errorHandler}