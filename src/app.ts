import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Category, CategoryModule } from '@modules';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { APP_GUARD } from '@nestjs/core';
import { dbConfig, appConfig, jwtConfig } from '@config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/uploads';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, appConfig, jwtConfig],
    }),

    ServeStaticModule.forRoot({
      serveRoot: './uploads',
      rootPath: './uploads'

    }),

    JwtModule.register({
      secret: 'mehriddin',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
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
    UserModule,
    UploadModule,
    // AuthModule
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    },{
      useClass: CheckRoleGuard,
      provide: APP_GUARD
    }
  ],
})
export class AppModule { }
