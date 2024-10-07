import { AppModule } from './app';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map((err) =>
          Object.values(err.constraints).join(', '),
        );
        throw new BadRequestException(errorMsgs.join(' && '));
      },
    }),
  );

  // app.useGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Green House API')
    .setDescription("Uyda bog' yaratish bo'yicha maslahatlar.")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(
    configService.get<number>('PORT'),
    configService.get<string>('HOST'),
    (): void => {
      console.log(`Listening on port ${configService.get<number>('PORT')}`)
    });
}
startApp();
