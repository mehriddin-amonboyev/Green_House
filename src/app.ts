import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { Category, CategoryModule } from '@modules';
import { CheckAuthGuard } from '@guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),


    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [Category],
            synchronize: true,
            // sync: {force: true},
            // logging: console.log,
            autoLoadModels: true,
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    CategoryModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ],
})
export class AppModule { }
