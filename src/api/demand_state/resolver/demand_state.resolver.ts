
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { DemandState } from '../entity/demand_state.entity';
import { DemandStateDTO } from '../entity/demand_state.dto';
import { DemandStateService } from '../service/demand_state.service';

@Resolver(of => DemandState)
export class DemandStateResolver extends createBasicCrudResolver(DemandState, String, DemandStateDTO, "errorDetail"){

    constructor(public service: DemandStateService){
        super(service);
    }

}