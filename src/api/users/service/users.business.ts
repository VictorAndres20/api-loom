import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { UserService } from './users.service';
import { AuthService } from 'src/api/auth/service/auth.service';
import { UserDTO } from '../entity/users.dto';
import { AuthDTO } from 'src/api/auth/entity/auth.dto';
import { isSameCrypted } from 'src/_utils/bcrypt.util';

@Injectable()
export class UserBusiness extends UserService{

    constructor(
        @InjectRepository(User)
        protected repo: Repository<User>,
        private authService: AuthService,
    ) {super(repo);}

    async findByLogin(login: string): Promise<User> {
        return this.findOne({ where: { login } });
    }

    async login(userDTO: UserDTO): Promise<AuthDTO>{
        let user = await this.findByLogin(userDTO.login);
        if(! user){
          throw new Error("Error credentials");
        }
    
        if(! isSameCrypted(userDTO.password, user.password)){
          throw new Error("Error credentials");
        }

        if(user.state !== 1) throw new Error(`Usuario no está activo`);
        let auth = new AuthDTO();
        auth.uuid = user.uuid;
        auth.login = user.login;
        auth.active = user.state;
        auth.rol = user.type?.cod;
        auth.token = this.authService.generateAccessToken(user.uuid);
        return auth;
    }

}