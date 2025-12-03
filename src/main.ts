import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  contentSecurityPolicy,
  crossOriginEmbedderPolicy,
  crossOriginOpenerPolicy,
  crossOriginResourcePolicy,
  dnsPrefetchControl,
  frameguard,
  hidePoweredBy,
  hsts,
  noSniff,
  referrerPolicy,
  xssFilter,
} from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet security headers individually
  app.use(hidePoweredBy());
  app.use(hsts());
  app.use(noSniff());
  app.use(xssFilter());
  app.use(frameguard());
  app.use(referrerPolicy({ policy: 'no-referrer' }));
  app.use(crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(crossOriginOpenerPolicy());
  app.use(crossOriginEmbedderPolicy());
  app.use(dnsPrefetchControl());
  app.use(contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  const port = process.env.PORT ?? 3005;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
