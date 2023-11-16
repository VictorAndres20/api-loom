
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { RenderType } from '../entity/render_type.entity';
import { RenderTypeDTO } from '../entity/render_type.dto';
import { RenderTypeService } from '../service/render_type.service';

@Resolver(of => RenderType)
export class RenderTypeResolver extends createBasicCrudResolver(RenderType, String, RenderTypeDTO, "userrenderType"){

    constructor(public service: RenderTypeService){
        super(service);
    }

}