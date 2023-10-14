import rateLimiter from 'express-rate-limit'

export const limiter = rateLimiter({
    max: 30,
    windowMs: 60000,
    message:
        "You can't make any more requests at the moment. Try again in 60 seconds.",
})

export const signInLimiter = rateLimiter({
    max: 3,
    windowMs: 60000,
    message: 'Too many sign-in attempts, Try again in 60 seconds.',
    skipFailedRequests: true,
})

export const applyLimiter = rateLimiter({
    max: 4,
    windowMs: 1000 * 60 * 60 * 6, // 6 hours
    message: 'You have applied too many times. Try again later.',
    skipFailedRequests: true,
})
