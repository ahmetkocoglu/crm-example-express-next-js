import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"

enum type { HOME = 'home', CENTER = 'centre', BRANCH = 'branch' };

@Entity("phones")
export class Phone {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: type, default: type.HOME, nullable: false })
    phoneType: type

    @Column({ type: 'varchar', length: 20, nullable: false })
    phoneNumber: string

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', nullable: false })
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
            user: this.id
        })

        logRepository.save(log)
    }
}
