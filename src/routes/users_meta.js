import express from 'express';
import {param} from 'express-validator';
import {getUserMeta} from '../controllers/user_meta.js';

const userMetaRouter = express.Router();

const idParamValidator = param('id', 'invalid id')
  .exists()
  .isNumeric()
  .isLength({min: 1});

userMetaRouter.get('/:id',idParamValidator, getUserMeta);

export default userMetaRouter;