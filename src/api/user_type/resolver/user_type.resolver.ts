
import { createBasicCrudResolver } from 'src/commons/resolvers/crud.resolver';
import { UserTypeDTO } from '../entity/user_type.dto';
import { UserType } from '../entity/user_type.entity';
import { UserTypeService } from '../service/user_type.service';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => UserType)
export class UserTypeResolver extends createBasicCrudResolver(UserType, String, UserTypeDTO, "userType"){

    constructor(public service: UserTypeService){
        super(service);
    }

}