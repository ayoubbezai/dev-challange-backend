import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // ✅ default import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 REQUIRED: enables req.cookies
  // app.use(cookieParser());

  // 🔐 CORS for cookie-based auth
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://devchallenge.gdgbatna.com',
      'https://gdgbatna.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application running on port ${port}`);
}

bootstrap();
