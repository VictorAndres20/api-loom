
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { ErrorDetail } from '../entity/error_detail.entity';
import { ErrorDetailDTO } from '../entity/error_detail.dto';
import { ErrorDetailBusiness } from '../service/error_detail.business';

@Resolver(of => ErrorDetail)
export class ErrorDetailResolver extends createBasicCrudResolver(ErrorDetail, String, ErrorDetailDTO, "errorDetail"){

    constructor(public service: ErrorDetailBusiness){
        super(service);
    }

}