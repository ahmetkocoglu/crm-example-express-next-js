import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"
import { ContactType } from "../enum/ContactType"

@Entity("emails")
export class Email {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: ContactType, default: ContactType.HOME, nullable: false })
    emailType: ContactType

    @Column({nullable: false})
    emailAddress: string

    @ManyToOne(() => User, (user) => user.id, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({ name: "userId" })
    user: User

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
