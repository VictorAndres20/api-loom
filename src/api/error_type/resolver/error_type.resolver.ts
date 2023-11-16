
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { ErrorType } from '../entity/error_type.entity';
import { ErrorTypeDTO } from '../entity/error_type.dto';
import { ErrorTypeService } from '../service/error_type.service';

@Resolver(of => ErrorType)
export class ErrorTypeResolver extends createBasicCrudResolver(ErrorType, String, ErrorTypeDTO, "errorType"){

    constructor(public service: ErrorTypeService){
        super(service);
    }

}