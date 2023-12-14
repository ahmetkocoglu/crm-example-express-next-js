import { AppDataSource } from "../data-source";
import { Log } from "../entity/Log";

export const LogSave = (userId: Number, message: String, type: String) => {
    console.log('test log işlemi');
    const logRepository = AppDataSource.getRepository(Log)
    const log = Object.assign(new Log(), {
        type,
        process: message,
        user: userId
    })

    logRepository.save(log)
}

exports.module = { LogSave }