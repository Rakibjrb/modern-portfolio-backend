import rateLimit from 'express-rate-limit';

const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: "You have sent too many messages. Please try again after an hour."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export { contactRateLimiter };