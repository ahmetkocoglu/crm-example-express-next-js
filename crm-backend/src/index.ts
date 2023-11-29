import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
require('dotenv').config();
import cors = require("cors")
import jwt = require('jsonwebtoken')

AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cors({ credentials: true }))

    app.all('*', (request: Request, response: Response, next: NextFunction) => {
        console.log(request.url.endsWith('/login'));

        if (request.url.endsWith('/login') || request.url.endsWith('/register')) {
            next()
        } else {
            try {
                const token = request.headers.authorization
                const verify = jwt.verify(token, "secret")
                const decode: any = verify ? jwt.decode(token) : null

                console.log(verify ? '--' : '**');
                console.log(token);
                console.log(decode.data.email);

                next()
            } catch (error: any) {
                response.status(401).json({ status: false, message: error.message })
            }
        }
    })
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](`/api/v1${route.route}`, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.use((error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
        console.log(error)
        response.status(404).json('test işlemi')
    })

    // start express server
    app.listen(process.env.PORT)
    console.log("Express server has started on port " + process.env.PORT)
}).catch(error => console.log(error))
