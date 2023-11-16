import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ErrorType } from 'src/api/error_type/entity/error_type.entity'
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({name:'render_type'})
@ObjectType()
export class RenderType{

    @PrimaryColumn()
    @Field()
    cod: string;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => ErrorType, e => e.render_type)
    types: ErrorType[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */