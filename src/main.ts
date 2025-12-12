import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS properly
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://devchallenge.gdgbatna.com',
      'https://gdgbatna.com'
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Allow-Credentials',
    ],
    exposedHeaders: ['Set-Cookie', 'Authorization'],
  });
  
  const port = process.env.PORT || 3000; 
  await app.listen(port, '0.0.0.0');
  console.log(`Application running on port ${port}`);
}

bootstrap();
