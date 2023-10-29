import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from '../entity/demand.entity';
import { DemandService } from './demand.service';

@Injectable()
export class DemandBusiness extends DemandService{

    constructor(
        @InjectRepository(Demand)
        protected repo: Repository<Demand>,
    ) {super(repo);}

}