import express from 'express';
import {body} from 'express-validator';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {getExplorePosts, getFeedPosts, getPosts, postPost} from '../controllers/posts.js';
import {
  limitQueryValidator,
  pageQueryValidator,
  userIdParamValidator
} from './core/validators.js';

const imageUrlValidator = body('imageUrl', 'invalid image url')
  .exists()
  .isURL();

const headerValidator = body('header', 'invalid header').exists();
const descriptionValidator = body('description', 'invalid description').exists();

const postsRouter = express.Router();

postsRouter.post('/', imageUrlValidator, headerValidator, descriptionValidator, validationErrorHandler, postPost);
postsRouter.get('/user/:userId', userIdParamValidator, pageQueryValidator, limitQueryValidator, validationErrorHandler, getPosts);
postsRouter.get('/feed/:userId', userIdParamValidator, pageQueryValidator, limitQueryValidator, validationErrorHandler, getFeedPosts);
postsRouter.get('/explore', pageQueryValidator, limitQueryValidator, validationErrorHandler, getExplorePosts);

export default postsRouter;
