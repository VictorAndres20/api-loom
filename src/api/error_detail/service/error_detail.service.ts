import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../../../commons/services/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorDetail } from '../entity/error_detail.entity';
import { ErrorDetailDTO } from '../entity/error_detail.dto';
import { ErrorType } from 'src/api/error_type/entity/error_type.entity'

@Injectable()
export class ErrorDetailService extends BasicCrudService<ErrorDetail, string, ErrorDetailDTO>{

    constructor(
        @InjectRepository(ErrorDetail)
        protected repo: Repository<ErrorDetail>,
    ) {super();}

    findById(id: string): Promise<ErrorDetail>{
        try{
            return this.findOne({where: {cod:id}});
        } catch(err){
            throw new Error(err.message);
        }
    }

    buildBaseCreation(dto: ErrorDetailDTO): ErrorDetail{
        //Validations data
        if(! dto) throw new Error('DTO empty');

        //Assign data
        let entity = new ErrorDetail();
        entity.name = dto.name;
        let error_type = new ErrorType();
        error_type.cod = dto.type;
        entity.type = error_type;
        return entity;
    }

    async dataValidationBeforeCreate(dto: ErrorDetailDTO): Promise<void> {
        // Input validations for null values that are required
        // For example validate if not exists for specific(s) properties
        // Example same login, same email, same cod, same nit
    }

    buildBaseEdition(entity: ErrorDetail, dto: ErrorDetailDTO): ErrorDetail{
        //Validations data
        if(! dto) throw new Error('DTO empty');
        if(! dto.cod) throw new Error('Entity id null');

        //Assign data
        entity.name = dto.name ? dto.name : entity.name;
        let error_type = new ErrorType();
        error_type.cod = dto.type;
        entity.type = dto.type ? error_type : entity.type;
        return entity;
    }

    async dataValidationBeforeEdit(dto: ErrorDetailDTO): Promise<void> {
        // Input validations for null values that are required
        // For example validate if not exists for specific(s) properties
        // Example same login, same email, same cod, same nit
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */