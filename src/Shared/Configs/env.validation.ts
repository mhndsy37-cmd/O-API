import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    MONGO_URI: z.string().startsWith('mongodb', {
        message: 'MONGO_URI must be a valid MongoDB connection string',
    }),
    JWT_SECRET: z.string().min(32, {
        message: 'JWT_SECRET must be at least 32 characters long for security',
    }),
    JWT_EXPIRES_IN: z.string().default('1d'),
});
type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(config: Record<string, unknown>) {
    const parsed = envSchema.safeParse(config);
    if (!parsed.success) {
        console.error('Invalid environment variables:');
        console.error(parsed.error.format());
        throw new Error('Invalid environment variables');
    }
    return parsed.data;
}
export{EnvConfig,type envSchema,validateEnv}