import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorDetail } from './entity/error_detail.entity';
import { ErrorDetailService } from './service/error_detail.service';
import { ErrorDetailController } from './controller/error_detail.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ErrorDetail]),
    ],
    controllers: [
        ErrorDetailController,
    ],
    providers: [
        ErrorDetailService,
    ],
    exports: [
        ErrorDetailService,
    ],
})
export class ErrorDetailModule{}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */