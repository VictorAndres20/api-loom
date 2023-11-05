import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorDetail } from '../entity/error_detail.entity';
import { ErrorDetailService } from './error_detail.service';

@Injectable()
export class ErrorDetailBusiness extends ErrorDetailService{

    constructor(
        @InjectRepository(ErrorDetail)
        protected repo: Repository<ErrorDetail>,
    ) {super(repo);}

    findAllByErrorType(type: string): Promise<ErrorDetail[]>{
        try{
            return this.findMany({where: { type: { cod: type } }});
        } catch(err){
            throw new Error(err.message);
        }
    }

}