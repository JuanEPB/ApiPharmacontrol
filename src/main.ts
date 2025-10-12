// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://127.0.0.1:8001',
      'http://localhost:8001',
      'http://127.0.0.1:8000',
      'http://localhost:8000',
      'http://localhost:8081',
      'http://127-0-0.1:8081',
    ],
    credentials: true, // <- necesario para cookies
    methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
