import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // create application

  const app = await NestFactory.create(AppModule);

  // for handling validation 
  app.useGlobalPipes(new ValidationPipe());

  // setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API documentation for the Library Management system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // run server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
