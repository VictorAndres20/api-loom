
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Demand } from '../entity/demand.entity';
import { DemandDTO } from '../entity/demand.dto';
import { DemandBusiness } from '../service/demand.business';
import { ErrorDetail } from 'src/api/error_detail/entity/error_detail.entity';
import { ErrorDetailService } from 'src/api/error_detail/service/error_detail.service';

@Resolver(of => Demand)
export class DemandResolver extends createBasicCrudResolver(Demand, String, DemandDTO, "demand"){

    constructor(public service: DemandBusiness, protected errorDetailService: ErrorDetailService){
        super(service);
    }

    @ResolveField(returns => ErrorDetail)
    errorDetail(@Parent() errorDetail: ErrorDetail): Promise<ErrorDetail>{
        return this.errorDetailService.findById(errorDetail.cod);
    }

}