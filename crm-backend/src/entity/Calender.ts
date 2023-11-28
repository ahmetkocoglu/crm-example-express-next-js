import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"

enum type { MEETING = 'meeting', PHONE = 'phone', EMAIL = 'email', LOCATION = 'location' };

@Entity("calenders")
export class Calender {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: type, default: type.MEETING, nullable: false })
    calenderType: type

    @Column({ type: 'varchar', length: 250, nullable: false })
    title: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'json' })
    traits: object;

    @ManyToOne(() => User, (user) => user.id, {nullable: false})
    @JoinColumn({ name: "userId" })
    user: User

    @ManyToOne(() => User, (user) => user.id, {nullable: true})
    @JoinColumn({ name: "participantId" })
    participant: User

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
            process: 'takvim bilgisi',
            user: this.id
        })

        logRepository.save(log)
    }
}
