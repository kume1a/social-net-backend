import express from 'express';
import {body} from 'express-validator';
import {postSignin, postSignup} from '../controllers/auth/auth.js';

const nameValidator = body('name', 'invalid name')
  .exists()
  .trim()
  .isLength({min: 3, max: 255});

const emailValidator = body('email', 'invalid email')
  .exists()
  .isEmail()
  .normalizeEmail();

const passwordValidator = body('password', 'weak password')
  .exists()
  .isLength({min: 4, max: 255});

const authRouter = express.Router();

authRouter.post('/signup', nameValidator, emailValidator, passwordValidator, postSignup);
authRouter.post('/signin', emailValidator, passwordValidator, postSignin)

export default authRouter;