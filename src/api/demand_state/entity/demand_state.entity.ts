import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Demand } from 'src/api/demand/entity/demand.entity'
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({name:'demand_state'})
@ObjectType()
export class DemandState{

    @PrimaryColumn()
    @Field()
    cod: string;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => Demand, e => e.demand_state)
    demands: Demand[];

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */