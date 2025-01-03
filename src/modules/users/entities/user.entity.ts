import { BaseEntity } from "src/common/entities/base.entity";
import { Role } from "src/common/enums/role.enum";
import { Column, Entity } from "typeorm";

@Entity("user_auth")
export class UserEntity extends BaseEntity {
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, nullable: true })
    role: Role;
}
