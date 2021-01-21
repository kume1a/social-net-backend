import {param, query} from 'express-validator';

const userIdParamValidator = param('userId', 'invalid user id')
  .exists()
  .not()
  .isEmpty()
  .isNumeric()
  .custom((value) => value > 0);

const pageQueryValidator = query('page', 'invalid page')
  .exists()
  .not()
  .isEmpty()
  .isNumeric()
  .custom((value) => value > 0);

const limitQueryValidator = query('limit', 'invalid limit')
  .exists()
  .not()
  .isEmpty()
  .isNumeric()
  .custom((value) => value > 0);

export {
  userIdParamValidator,
  pageQueryValidator,
  limitQueryValidator,
};