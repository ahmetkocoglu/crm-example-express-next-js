import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserModel } from "../model/UserModel"
import { RegisterModel } from "../model/RegisterModel"
import { BaseUserModel } from "../model/BaseUserModel"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const users: Array<UserModel> = (await this.userRepository.find()).map((k: UserModel) => {
            return {
                firstName: k.firstName,
                lastName: k.lastName,
                email: k.email,
                role: k.role,
                confirmed: k.confirmed,
                createdAt: k.createdAt
            } as UserModel
        })

        return {status: true, users}
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return {
            status: true,
            user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            confirmed: user.confirmed,
            createdAt: user.createdAt
        } as UserModel}
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password }: RegisterModel = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password
        })

        return await this.userRepository.save(user)
    }

    async newUser(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email }: BaseUserModel = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password: (Math.random()*1000).toFixed(0)
        })
        
        try {
            return await this.userRepository.save(user)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { firstName, lastName } = request.body;

        return await this.userRepository.update({ id }, {
            firstName,
            lastName
        })
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}