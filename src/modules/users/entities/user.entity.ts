import { BaseEntity } from "src/common/entities/base.entity";
import { Role } from "src/common/enums/role.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity("user_auth")
export class UserEntity extends BaseEntity {
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, nullable: true })
    role: Role;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
}
