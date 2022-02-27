import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { CategoryModule } from './category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProductModule } from './product/product.module'
import { BrandModule } from './brand/brand.module'
import { graphqlUploadExpress } from 'graphql-upload'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postceliogres@localhost:5432/devshop',
      autoLoadEntities: true,
      synchronize: true,
      //entities: [Category],
      logging: true,
    }),*/
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    CategoryModule,
    ProductModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
