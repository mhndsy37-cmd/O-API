import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { DomainExceptionFilter } from './Shared/Filters/DomainException.filter.js';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT')as number|string;
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new DomainExceptionFilter())
    app.useStaticAssets(path.join(process.cwd(), 'public'), {
        prefix: '/', 
    });
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();