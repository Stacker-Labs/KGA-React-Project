import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: [
        'https://eunjae.store',
        'https://stacker-labs.vercel.app',
        'http://localhost:3000',
      ],
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Stacker Labs')
    .setDescription('Develop programming skill')
    .setVersion('1.0')
    .addTag('/')
    .addTag('auth')
    .addTag('boards')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(4000);
}
bootstrap();
