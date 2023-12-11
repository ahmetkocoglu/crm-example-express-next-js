import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Phone } from "../entity/Phone"

export class PhoneController {

    private phoneRepository = AppDataSource.getRepository(Phone)

    async all(request: Request, response: Response, next: NextFunction) {
        const phones = this.phoneRepository.find()

        return { data: phones, status: true }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const phone = await this.phoneRepository.findOne({
            where: { id }
        })

        if (!phone) {
            return "unregistered phone"
        }
        return phone
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { userId, phoneType, phoneNumber } = request.body;

        const phone = Object.assign(new Phone(), {
            user: userId,
            phoneType,
            phoneNumber
        })

        try {
            const insert = await this.phoneRepository.save(phone)
            return { data: insert, status: true }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { userId, phoneType, phoneNumber } = request.body;

        try {
            const update = await this.phoneRepository.update({ id }, {
                user: userId,
                phoneType,
                phoneNumber
            })
            return { data: update, status: update.affected > 0 }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let phoneToRemove = await this.phoneRepository.findOneBy({ id })

        if (!phoneToRemove) {
            return "this phone not exist"
        }

        await this.phoneRepository.remove(phoneToRemove)

        return "phone has been removed"
    }

}