import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

// Middlewares

//API Module
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

//You can use dotenv
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // change for db you need
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA, //Uncomment it if you use Schema
      synchronize: false,
      logging: true, // TODO in production put it false
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // stop playground if you need
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}