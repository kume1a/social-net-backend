import express from 'express';
import {body} from 'express-validator';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {getExplorePosts, getFeedPosts, getPosts, postDislike, postLike, postPost} from '../controllers/posts.js';
import {
  imageUrlValidator,
  limitQueryValidator,
  pageQueryValidator,
  userIdParamValidator
} from './core/validators.js';



const headerValidator = body('header', 'invalid header').exists();
const descriptionValidator = body('description', 'invalid description').exists();
const postIdValidator = body('postId', 'invalid postId')
  .exists()
  .not()
  .isEmpty()
  .isNumeric();

const postsRouter = express.Router();

postsRouter.post('/', imageUrlValidator, headerValidator, descriptionValidator, validationErrorHandler, postPost);
postsRouter.post('/like', postIdValidator, validationErrorHandler, postLike);
postsRouter.post('/dislike', postIdValidator, validationErrorHandler, postDislike);
postsRouter.get('/user/:userId', userIdParamValidator, pageQueryValidator, limitQueryValidator, validationErrorHandler, getPosts);
postsRouter.get('/feed', pageQueryValidator, limitQueryValidator, validationErrorHandler, getFeedPosts);
postsRouter.get('/explore', pageQueryValidator, limitQueryValidator, validationErrorHandler, getExplorePosts);

export default postsRouter;
