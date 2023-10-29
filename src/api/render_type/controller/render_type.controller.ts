import { Controller, Get, Post, Body, HttpException, Param, UseGuards } from '@nestjs/common';
import { HttpResponse } from '../../../commons/responses/http_response';
import { BasicRestController } from '../../../commons/controllers/rest.controller';
import { AuthGuard } from '@nestjs/passport';
import { RenderType } from '../entity/render_type.entity';
import { RenderTypeDTO } from '../entity/render_type.dto';
import { RenderTypeService } from '../service/render_type.service';

@Controller('render-type')
export class RenderTypeController extends BasicRestController<RenderType, string, RenderTypeDTO>{

    constructor(protected service: RenderTypeService){super();}

}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */