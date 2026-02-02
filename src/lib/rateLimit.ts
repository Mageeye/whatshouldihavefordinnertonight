type RateLimitState = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
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

export const rateLimit = (
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult => {
  const store = getStore()
  const now = Date.now()
  const current = store.get(key)

  if (!current || now > current.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { ok: true, remaining: limit - 1, resetAt }
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt }
  }

  const nextCount = current.count + 1
  store.set(key, { count: nextCount, resetAt: current.resetAt })
  return { ok: true, remaining: limit - nextCount, resetAt: current.resetAt }
}
