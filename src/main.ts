import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { DomainExceptionFilter } from './Shared/Filters/DomainException.filter.js';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
async function bootstrap() {
    //start nest
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    //get confings
    const configService = app.get(ConfigService);
    //get port from env validator
    const port = configService.get<number>('PORT') as number | string;
    //get node_env from env validator
    const node_step=configService.get<number>('NODE_ENV') as number | string;
    //logger
    app.useLogger(app.get(Logger));
    //req body protect
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ extended: true, limit: '10mb' }));
    //pips
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    //compress
    app.use(compression());
    //filters
    app.useGlobalFilters(new DomainExceptionFilter())
    //storage asset
    app.useStaticAssets(path.join(process.cwd(), 'public'), {
        prefix: '/',
    });
    //helmet protect
    app.use(helmet({
        contentSecurityPolicy: node_step === 'production',
        crossOriginEmbedderPolicy: false,
    }));
    // CORS
    app.enableCors({
        origin: node_step === 'production'
            ? ['https://myshop.com', 'https://www.myshop.com']
            : '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    });
    //start up
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();