
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ErrorType } from '../entity/error_type.entity';
import { ErrorTypeDTO } from '../entity/error_type.dto';
import { ErrorTypeService } from '../service/error_type.service';
import { RenderType } from 'src/api/render_type/entity/render_type.entity';

@Resolver(of => ErrorType)
export class ErrorTypeResolver extends createBasicCrudResolver(ErrorType, String, ErrorTypeDTO, "errorType"){

    constructor(public service: ErrorTypeService){
        super(service);
    }

    @ResolveField(returns => RenderType)
    renderType(@Parent() renderType: RenderType): RenderType{
        return renderType;
    }

}