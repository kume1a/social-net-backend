import express from 'express';
import {getUser, getFollowStatus, postSwitchFollowStatus, getUserMeta} from '../controllers/users.js';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {userIdParamValidator} from './core/validators.js';

const userRouter = express.Router();

userRouter.get('/:userId', userIdParamValidator, validationErrorHandler, getUser);
userRouter.get('/:userId/followStatus', userIdParamValidator, validationErrorHandler, getFollowStatus);
userRouter.get('/:userId/meta', userIdParamValidator, validationErrorHandler, getUserMeta);
userRouter.post('/:userId/switchFollowStatus', userIdParamValidator, validationErrorHandler, postSwitchFollowStatus);

export default userRouter;