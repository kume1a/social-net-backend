import {validationResult} from 'express-validator';

const validationErrorHandler = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    next();
  } else {
    next({statusCode: 422, error: errors});
  }
};

export default validationErrorHandler;