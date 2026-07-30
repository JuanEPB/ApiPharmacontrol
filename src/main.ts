// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config(); // carga .env sólo en desarrollo
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.setGlobalPrefix('api');

  // Leer orígenes desde env (coma-separados) o usar lista por defecto
  const corsOriginsEnv = process.env.CORS_ORIGINS;
  const defaultOrigins = [
    'http://localhost:8081',
    'http://localhost:5173'
  ];
  const origins = corsOriginsEnv
    ? corsOriginsEnv.split(',').map(o => o.trim())
    : defaultOrigins;

  app.enableCors({
    origin: origins,
    credentials: true, // necesario para cookies
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.use(cookieParser());

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // bind a 0.0.0.0 para que sea accesible externamente en EC2
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API running on http://0.0.0.0:${port}/api (env=${process.env.NODE_ENV})`);
}
bootstrap();
