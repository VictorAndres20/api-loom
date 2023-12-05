import { Controller, Get, Post, Body, HttpException, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { Demand } from '../entity/demand.entity';
import { DemandDTO } from '../entity/demand.dto';
import { DemandBusiness } from '../service/demand.business';
import { Response } from 'express';

@Controller('demand')
export class DemandController extends BasicRestController<Demand, string, DemandDTO>{

    constructor(protected service: DemandBusiness){super();}

    @Get('tz')
    async tz(@Res() res: Response ): Promise<void> {
        try{
            res.status(HttpStatus.OK).json(new HttpResponse<string>().setData(new Date().toString()).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<string>().setError(err.message).build(false));
        }
    }

    @Get('all/pending')
    async findAllPending(@Res() res: Response ): Promise<void> {
        try{
            let list = await this.service.findAllPending();
            res.status(HttpStatus.OK).json(new HttpResponse<Demand>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Demand>().setError(err.message).build(false));
        }
    }

    @Get('all/type/:type')
    async findAllByType(@Res() res: Response, @Param("type") type: string ): Promise<void> {
        try{
            let list = await this.service.findAllByErrorType(type);
            res.status(HttpStatus.OK).json(new HttpResponse<Demand>().setList(list).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Demand>().setError(err.message).build(false));
        }
    }

    @Get('pdf/:uuid')
    async pdfById(@Res() res: Response, @Param("uuid") uuid: string ): Promise<void> {
        try{
            let data = await this.service.buildPdfById(uuid);
            res.status(HttpStatus.OK).json(new HttpResponse<DemandDTO>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<DemandDTO>().setError(err.message).build(false));
        }
    }

    @Get('solve/:uuid')
    async solve(@Res() res: Response, @Param("uuid") uuid: string ): Promise<void> {
        try{
            let data = await this.service.changeSolved(uuid);
            res.status(HttpStatus.OK).json(new HttpResponse<Demand>().setData(data).build(true));
        } catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new HttpResponse<Demand>().setError(err.message).build(false));
        }
    }

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */