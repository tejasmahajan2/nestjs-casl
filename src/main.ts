import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CASL')
    .setDescription('The CASL description')
    .setVersion('1.0')
    .addTag('CASL')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const port = process.env.NODE_PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  const logger = new Logger('NestApplication');
  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
