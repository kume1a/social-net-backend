import express from 'express';
import {getUser, getFollowStatus, postSwitchFollowStatus} from '../controllers/users.js';
import authCheck from '../controllers/auth/auth_check.js';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {userIdParamValidator} from './core/validators.js';

const userRouter = express.Router();

userRouter.get('/:userId', authCheck, userIdParamValidator, validationErrorHandler, getUser);
userRouter.get('/:userId/followStatus', authCheck, userIdParamValidator, validationErrorHandler, getFollowStatus);
userRouter.post('/:userId/switchFollowStatus', authCheck, userIdParamValidator, validationErrorHandler, postSwitchFollowStatus);

export default userRouter;