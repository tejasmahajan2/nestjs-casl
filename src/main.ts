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

  // Check if Swagger should be enabled
  if (process.env.ENABLE_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('IPOJI Plus')
      .setExternalDoc('API JSON Documentation', 'docs')
      .setVersion('1.0')
      .addServer(process.env.NODE_ORIGIN_LOCAL, 'Local')
      .addServer(process.env.NODE_ORIGIN_DEVELOPMENT, 'Development')
      .addServer(process.env.NODE_ORIGIN_PRODUCTION, 'Production')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Use the JWT token provided after login for authentication.'
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      jsonDocumentUrl: 'docs',
    });
  }

  const port = process.env.NODE_PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  const logger = new Logger('NestApplication');
  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
