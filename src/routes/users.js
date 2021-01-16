import express from 'express';
import {param} from 'express-validator';
import {getUser} from '../controllers/users.js';
import authCheck from '../controllers/auth/auth_check.js';

const userMetaRouter = express.Router();

const idParamValidator = param('userId', 'invalid id')
  .exists()
  .isNumeric()
  .isLength({min: 1});

userMetaRouter.get('/:userId', authCheck, idParamValidator, getUser);

export default userMetaRouter;