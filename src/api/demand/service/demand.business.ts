import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from '../entity/demand.entity';
import { DemandService } from './demand.service';
import { DemandDTO } from '../entity/demand.dto';
import { buildDemandPDFDoc } from 'src/_utils/pdf.util';
import { deleteInternalFile, readBase64InternalFile } from 'src/_utils/files.util';
import * as path from 'path';

@Injectable()
export class DemandBusiness extends DemandService{

    constructor(
        @InjectRepository(Demand)
        protected repo: Repository<Demand>,
    ) {super(repo);}

    findAllPending(): Promise<Demand[]> {
        try{
            return this.findMany({ where: { demand_state: { cod: 'PENDI' } }, order: { date_created: 'ASC' } });
        } catch(err){
            throw new Error(err.message);
        }
    }

    findAllByErrorType(errorType: string): Promise<Demand[]> {
        try{
            return this.findMany({ where: { error_detail: { type: { cod: errorType } }, demand_state: { cod: 'PENDI' } }, order: { date_created: 'ASC' } });
        } catch(err){
            throw new Error(err.message);
        }
    }

    async buildPdfById(uuid: string): Promise<DemandDTO> {
        const demand = await this.findOne({ where: { uuid } });
        const pathFile = `${__dirname}`;
        const fileName = `${uuid}_${Date.now()}.pdf`;
        await buildDemandPDFDoc(path.join(pathFile, fileName), demand)
        const bytes = readBase64InternalFile(pathFile, fileName);
        deleteInternalFile(pathFile, fileName);
        let dto = new DemandDTO();
        dto.bytes = bytes;
        return dto;
    }

    async changeSolved(uuid: string): Promise<Demand> {
        return await this.changeState(uuid, 'SOLVE');
    } 

    async changeState(uuid: string, state: string): Promise<Demand> {
        let dto = new DemandDTO();
        dto.uuid = uuid;
        dto.demand_state = state;
        dto.date_closed = new Date();
        return await this.editOne(dto, dto.uuid);
    }

}