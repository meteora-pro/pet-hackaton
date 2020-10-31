import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from './user.entity';

@Entity({name: 'tokens'})
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    iat: Date;

    @Column()
    exp: Date;

    @ManyToOne(() => UserEntity, user => user.tokens)
    user: UserEntity

}
