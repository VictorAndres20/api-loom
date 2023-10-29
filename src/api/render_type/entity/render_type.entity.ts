import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ErrorType } from 'src/api/error_type/entity/error_type.entity'

@Entity({name:'render_type'})
export class RenderType{

    @PrimaryColumn()
    cod: string;

    @Column()
    name: string;

    @OneToMany(() => ErrorType, e => e.render_type)
    types: ErrorType[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */