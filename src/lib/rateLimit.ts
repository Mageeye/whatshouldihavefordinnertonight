import { Redis } from '@upstash/redis'

type RateLimitState = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
  source: 'redis' | 'memory'
}

const hasRedisConfig = () =>
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN

const getRedis = () => {
  if (!hasRedisConfig()) return null
  const globalForRedis = globalThis as unknown as { __redis?: Redis }
  if (!globalForRedis.__redis) {
    globalForRedis.__redis = Redis.fromEnv()
  }
  return globalForRedis.__redis
}

const getStore = () => {
  const globalForRateLimit = globalThis as unknown as {
    __rateLimitStore?: Map<string, RateLimitState>
  }

  if (!globalForRateLimit.__rateLimitStore) {
    globalForRateLimit.__rateLimitStore = new Map()
  }

  return globalForRateLimit.__rateLimitStore
}

const memoryRateLimit = (
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult => {
  const store = getStore()
  const now = Date.now()
  const current = store.get(key)

  if (Math.random() < 0.01) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetAt) {
        store.delete(k)
      }
    }
  }

  if (!current || now > current.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { ok: true, remaining: limit - 1, resetAt, source: 'memory' }
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt, source: 'memory' }
  }

  const nextCount = current.count + 1
  store.set(key, { count: nextCount, resetAt: current.resetAt })
  return {
    ok: true,
    remaining: limit - nextCount,
    resetAt: current.resetAt,
    source: 'memory',
  }
}

export const rateLimit = async (
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> => {
  const redis = getRedis()
  if (!redis) {
    return memoryRateLimit(key, limit, windowMs)
  }

  const now = Date.now()
  const windowSec = Math.ceil(windowMs / 1000)
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, windowSec)
  }

  let ttl = await redis.ttl(key)
  if (ttl < 0) {
    await redis.expire(key, windowSec)
    ttl = windowSec
  }

  const resetAt = now + ttl * 1000
  return {
    ok: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt,
    source: 'redis',
  }
}
