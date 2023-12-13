import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"
import { TaskType } from "../enum/TaskType"
import { TaskStatus } from "../enum/TaskStatus"

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: TaskType, default: TaskType.STANDARD, nullable: false })
    type: TaskType

    @Column({ type: 'varchar', length: 150, nullable: false })
    title: string

    @Column({ type: 'text', length: 400 })
    description: string

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({ name: "userId" })
    user: User

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "responsibleId" })
    responsible: User

    @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.APPOINTED, nullable: false })
    status: TaskStatus

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updateAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt: Date;

    @AfterInsert()
    async userLog(){
        const logRepository = AppDataSource.getRepository(Log)
        const log = Object.assign(new Log(), {
            type: 'user_info',
            process: 'adres bilgisi',
            user: this.user
        })

        logRepository.save(log)
    }
}
