import { Controller, Get, Post, Body, HttpException, Param, UseGuards, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { UserDTO } from '../entity/users.dto';
import { UserBusiness } from '../service/users.business';
import { AuthDTO } from 'src/api/auth/entity/auth.dto';
import { Response } from 'express';

@Controller('login')
export class LoginController {

    constructor(protected service: UserBusiness){}

    @Post('login')
    async login(@Res() res: Response, @Body() dto: UserDTO): Promise<void> {
        try{
            let data = await this.service.login(dto);
            res.status(HttpStatus.OK).json(new HttpResponse<AuthDTO>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<AuthDTO>().setError(err.message).build(false));
        }
    }

}