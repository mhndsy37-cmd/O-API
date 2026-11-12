import './instrument.js'; // sentry
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import path from 'node:path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { DomainExceptionFilter } from './Shared/Filters/DomainException.filter.js';

async function bootstrap() {
    // app
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // config
    const configService = app.get(ConfigService);
    
    // port
    const port = configService.get<number>('PORT') || 3000;
    
    // env
    const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

    // logger
    app.useLogger(app.get(Logger));

    // body
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ extended: true, limit: '10mb' }));

    // pipes
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // compress
    app.use(compression());

    // filters
    app.useGlobalFilters(new DomainExceptionFilter());

    // assets
    app.useStaticAssets(path.join(process.cwd(), 'public'), {
        prefix: '/',
    });

    // helmet
    app.use(helmet({
        contentSecurityPolicy: nodeEnv === 'production',
        crossOriginEmbedderPolicy: false,
    }));

    // cors
    app.enableCors({
        origin: nodeEnv === 'production'
            ? ['https://myshop.com', 'https://www.myshop.com']
            : '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    });
    //sentry
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new SentryGlobalFilter(httpAdapter));
    //swaggerConfig
     const swaggerConfig = new DocumentBuilder()
        .setTitle('Shop API')
        .setDescription('E-Commerce API Documentation')
        .setVersion('0.13.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    // start
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();