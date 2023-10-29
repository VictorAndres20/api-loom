import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../../../commons/services/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemandState } from '../entity/demand_state.entity';
import { DemandStateDTO } from '../entity/demand_state.dto';

@Injectable()
export class DemandStateService extends BasicCrudService<DemandState, string, DemandStateDTO>{

    constructor(
        @InjectRepository(DemandState)
        protected repo: Repository<DemandState>,
    ) {super();}

    findById(id: string): Promise<DemandState>{
        try{
            return this.findOne({where: {cod:id}});
        } catch(err){
            throw new Error(err.message);
        }
    }

    buildBaseCreation(dto: DemandStateDTO): DemandState{
        //Validations data
        if(! dto) throw new Error('DTO empty');

        //Assign data
        let entity = new DemandState();
        entity.name = dto.name;
        return entity;
    }

    async dataValidationBeforeCreate(dto: DemandStateDTO): Promise<void> {
        // Input validations for null values that are required
        // For example validate if not exists for specific(s) properties
        // Example same login, same email, same cod, same nit
    }

    buildBaseEdition(entity: DemandState, dto: DemandStateDTO): DemandState{
        //Validations data
        if(! dto) throw new Error('DTO empty');
        if(! dto.cod) throw new Error('Entity id null');

        //Assign data
        entity.name = dto.name ? dto.name : entity.name;
        return entity;
    }

    async dataValidationBeforeEdit(dto: DemandStateDTO): Promise<void> {
        // Input validations for null values that are required
        // For example validate if not exists for specific(s) properties
        // Example same login, same email, same cod, same nit
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */