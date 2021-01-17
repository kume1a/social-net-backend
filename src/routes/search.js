import express from 'express';
import {getUsers} from '../controllers/search.js';
import {param} from 'express-validator';

const queryParamValidator = param('query', 'invalid query')
  .exists()
  .not()
  .isEmpty();

const searchRouter = express.Router();

searchRouter.get('/users/:query', queryParamValidator, getUsers);

export default searchRouter;
