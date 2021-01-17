import express from 'express';
import {param} from 'express-validator';
import {getUser, getFollowStatus, postSwitchFollowStatus} from '../controllers/users.js';
import authCheck from '../controllers/auth/auth_check.js';
import validationErrorHandler from '../controllers/core/errorHandler.js';

const userRouter = express.Router();

const idParamValidator = param('userId', 'invalid id')
  .exists()
  .isNumeric()
  .not()
  .isEmpty()

userRouter.get('/:userId', authCheck, idParamValidator, validationErrorHandler, getUser);
userRouter.get('/:userId/followStatus', authCheck, idParamValidator, validationErrorHandler, getFollowStatus);
userRouter.post('/:userId/switchFollowStatus', authCheck, idParamValidator, validationErrorHandler, postSwitchFollowStatus);

export default userRouter;