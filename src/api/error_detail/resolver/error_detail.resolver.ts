
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ErrorDetail } from '../entity/error_detail.entity';
import { ErrorDetailDTO } from '../entity/error_detail.dto';
import { ErrorDetailBusiness } from '../service/error_detail.business';
import { ErrorType } from 'src/api/error_type/entity/error_type.entity';

@Resolver(of => ErrorDetail)
export class ErrorDetailResolver extends createBasicCrudResolver(ErrorDetail, String, ErrorDetailDTO, "errorDetail"){

    constructor(public service: ErrorDetailBusiness){
        super(service);
    }

    @ResolveField(returns => ErrorType)
    errorType(@Parent() errorType: ErrorType): ErrorType{
        return errorType;
    }

}