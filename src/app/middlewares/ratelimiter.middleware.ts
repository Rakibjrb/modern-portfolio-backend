import rateLimit from "express-rate-limit";

const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "You have sent too many messages. Please try again after an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

export { contactRateLimiter, loginRateLimiter };
