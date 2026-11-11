import * as Sentry from "@sentry/nestjs";

// init
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    
    // trace
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // ignore
    ignoreErrors: [
        'UnauthorizedException',
        'NotFoundException',
        'BadRequestException',
    ],
});