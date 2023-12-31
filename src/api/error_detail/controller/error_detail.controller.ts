import { Controller, Get, Post, Body, HttpException, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { ErrorDetail } from '../entity/error_detail.entity';
import { ErrorDetailDTO } from '../entity/error_detail.dto';
import { ErrorDetailBusiness } from '../service/error_detail.business';
import { Response } from 'express';

@Controller('error-detail')
export class ErrorDetailController extends BasicRestController<ErrorDetail, string, ErrorDetailDTO>{

    constructor(protected service: ErrorDetailBusiness){super();}

    @Get('all/type/:type')
    async findAllByType(@Res() res: Response, @Param("type") type: string ): Promise<void> {
        try{
            let list = await this.service.findAllByErrorType(type);
            res.status(HttpStatus.OK).json(new HttpResponse<ErrorDetail>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<ErrorDetail>().setError(err.message).build(false));
        }
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */