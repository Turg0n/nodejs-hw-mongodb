import createHttpError from 'http-errors';

export default function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: true });
      next();
    } catch (error) {
      next(
        createHttpError(400, 'Bad Request', {
          errors: error.details,
        }),
      );
    }
  };
}