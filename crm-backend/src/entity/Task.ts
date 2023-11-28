import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"

enum type { IMPORTANT = 'important', STANDARD = 'standard' };
enum status { APPOINTED = 'appointed', IN_PROGRESS = 'in_progress', DONE = 'done' };

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: type, default: type.STANDARD, nullable: false })
    type: type

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

    @Column({ type: "enum", enum: status, default: status.APPOINTED, nullable: false })
    status: status

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
            user: this.id
        })

        logRepository.save(log)
    }
}
