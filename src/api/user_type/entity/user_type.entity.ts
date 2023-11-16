import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/api/users/entity/users.entity'
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({name:'user_type'})
@ObjectType()
export class UserType{

    @PrimaryColumn()
    @Field()
    cod: string;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => User, e => e.type)
    users: User[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */