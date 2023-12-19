import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"
import { ContactEnum } from "../enum/ContactEnum"

@Entity("addresses")
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: ContactEnum, default: ContactEnum.HOME, nullable: false })
    addressType: ContactEnum

    @Column({nullable: true, length:250})
    addressLine: string

    @Column({nullable: true, length:30})
    location: string

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
            type: 'address',
            process: 'adres bilgisi',
            user: this.user
        })

        logRepository.save(log)
    }
}
