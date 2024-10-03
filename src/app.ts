import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './modules/categories/models';
import { CategoryModule } from './modules/categories';

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
  // providers: [{
  //   useClass:C
  // }],
})
export class AppModule { }
