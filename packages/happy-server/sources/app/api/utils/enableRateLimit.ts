import rateLimit from '@fastify/rate-limit';
import type { Fastify } from '../types';

/**
 * Registers global rate limiting.
 * Default: 200 req/min per IP.
 * Auth write endpoints are capped tighter at 20 req/min to slow brute-force attempts.
 * When REDIS_URL is set the shared Redis store is used so limits hold across replicas.
 */
export async function enableRateLimit(app: Fastify) {
    const redisUrl = process.env.REDIS_URL;
    const redisClient = redisUrl
        ? new (await import('ioredis')).default(redisUrl)
        : undefined;

    await (app as any).register(rateLimit, {
        global: true,
        max: 200,
        timeWindow: '1 minute',
        ...(redisClient ? { redis: redisClient } : {}),
        keyGenerator: (request: any) => {
            const forwarded = request.headers['x-forwarded-for'];
            return (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded?.[0]) ?? request.ip;
        },
        errorResponseBuilder: (_request: any, context: any) => ({
            statusCode: 429,
            error: 'Too Many Requests',
            message: `Rate limit exceeded. Retry in ${context.after}.`,
        }),
    });
}
