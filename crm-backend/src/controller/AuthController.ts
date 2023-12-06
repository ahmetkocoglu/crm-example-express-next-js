import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from 'bcrypt';
import jwt = require('jsonwebtoken')
import { UserModel } from "../model/UserModel";
import { RegisterModel } from "../model/RegisterModel";
import { LoginModel } from "../model/LoginModel";
import { ResponseLoginModel } from "../model/ResponseLoginModel";

export class AuthController {

    private userRepository = AppDataSource.getRepository(User)

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password }: LoginModel = request.body;

        const user = await this.userRepository.findOne({
            where: { email }
        })

        if (user) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
                const loginUser: ResponseLoginModel = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    confirmed: user.confirmed
                }

                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                    data: loginUser,
                }, "secret")

                return { status: true, token, user: loginUser }
            } else {
                const error: any = new Error("email ve/veya şifre geçersiz")
                next({ error, status: 401 })
            }
        } else {
            const error: any = new Error("email ve/veya şifre geçersiz")
            next({ error, status: 401 })
        }
    }
    async register(request: Request, response: Response, next: NextFunction) {
        const {firstName, lastName, email, password}: RegisterModel  = request.body;
        // const {firstName, lastName, email, password}  = request.body as RegisterModel;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password
        })

        // const body: RegisterModel = request.body;

        // const user = Object.assign(new User(), {
        //     firstName: body.firstName,
        //     lastName: body.lastName,
        //     email: body.email,
        //     password: body.password
        // })

        try {
            const insert = await this.userRepository.save(user)
            console.log(insert);

            return {
                firstName: insert.firstName,
                lastName: insert.lastName,
                email: insert.email,
                role: insert.role,
                confirmed: insert.confirmed,
            } as UserModel
        } catch (error: any) {
            if(error.code === undefined){
                error.message = error.map((k: any) => {
                    return { constraints: k.constraints, property: k.property }
                })
            }

            next({ error, status: 404 })
        }
    }
}