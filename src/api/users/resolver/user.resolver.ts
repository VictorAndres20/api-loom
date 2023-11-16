
import { createBasicQueryResolver } from 'src/commons/resolvers/crud.resolver';
import { UserDTO } from '../entity/users.dto';
import { User } from '../entity/users.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserBusiness } from '../service/users.business';
import { Query } from '@nestjs/common';
import { UserType } from 'src/api/user_type/entity/user_type.entity';
import { UserTypeService } from 'src/api/user_type/service/user_type.service';

@Resolver(of => User)
export class UserResolver extends createBasicQueryResolver(User, String, UserDTO, "user"){

    constructor(public service: UserBusiness, protected userTypeService: UserTypeService ){
        super(service);
    }

    @ResolveField(returns => UserType)
    userType(@Parent() userType: UserType): Promise<UserType>{
        return this.userTypeService.findById(userType.cod);
    }

}