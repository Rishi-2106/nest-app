import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    // Create a new NestJS application using the AppModule

    
  const app = await NestFactory.create(AppModule);
  /**
   * Enable Cross-Origin Resource Sharing (CORS)
   * - Allows requests from different origins.
   * - Set `origin: '*'` to allow all domains (consider restricting this in production).
   * - `credentials: true` enables sending cookies or authentication headers.
   */

  app.enableCors({
    origin: '*', // Allow all origins. Replace '*' with specific domain if needed.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  /**
   * Configure Swagger API documentation.
   * - Provides an interactive API documentation UI at `/api`.
   * - Helps developers understand and test API endpoints.
   */

  const config = new DocumentBuilder()
  .setTitle('Document management') // API title
  .setDescription('The Document API description') // Description for API docs
  .setVersion('0.1') // API version
  .build();
  
  // Create Swagger documentation and set up the API docs endpoint

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);  

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
