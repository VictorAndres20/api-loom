
import { createBasicQueryResolver } from 'src/commons/resolvers/crud.resolver';
import { Resolver } from '@nestjs/graphql';
import { Loom } from '../entity/loom.entity';
import { LoomDTO } from '../entity/loom.dto';
import { LoomService } from '../service/loom.service';

@Resolver(of => Loom)
export class LoomResolver extends createBasicQueryResolver(Loom, String, LoomDTO, "loom"){

    constructor(public service: LoomService){
        super(service);
    }

}