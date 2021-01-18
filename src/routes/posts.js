import express from 'express';
import {param, body} from 'express-validator';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {postPost} from '../controllers/posts.js';

const imageUrlValidator = body('imageUrl', 'invalid image url')
  .exists()
  .isURL();

const headerValidator = body('header', 'invalid header')
  .exists();

const descriptionValidator = body('description', 'invalid description')
  .exists();

const postsRouter = express.Router();

postsRouter.post('/', imageUrlValidator, headerValidator, descriptionValidator, validationErrorHandler, postPost);

export default postsRouter;
