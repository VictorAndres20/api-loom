
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { Demand } from '../entity/demand.entity';
import { DemandDTO } from '../entity/demand.dto';
import { DemandBusiness } from '../service/demand.business';

@Resolver(of => Demand)
export class DemandResolver extends createBasicCrudResolver(Demand, String, DemandDTO, "demand"){

    constructor(public service: DemandBusiness){
        super(service);
    }

}