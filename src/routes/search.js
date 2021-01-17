import express from 'express';
import {getUsers} from '../controllers/search.js';
import {param} from 'express-validator';
import validationErrorHandler from '../controllers/core/errorHandler.js';

const queryParamValidator = param('query', 'invalid query')
  .exists()
  .not()
  .isEmpty();

const searchRouter = express.Router();

searchRouter.get('/users/:query', queryParamValidator, validationErrorHandler, getUsers);

export default searchRouter;
