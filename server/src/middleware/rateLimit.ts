import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { error: 'Չափազանց շատ փորձեր, փորձեք 15 րոպե հետո' },
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5,
  message: { error: 'Չափազանց շատ հաղորդագրություններ, փորձեք հետո' },
});
