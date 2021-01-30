import express from 'express';
import {param, body} from 'express-validator';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {getComments, getReplies, postComment, postReply} from '../controllers/comments.js';
import {limitQueryValidator, pageQueryValidator} from './core/validators.js';

const commentsRouter = express.Router();

const postIdValidator = body('postId', 'invalid post id')
    .exists()
    .not()
    .isEmpty()
    .isNumeric();

const bodyValidator = body('body', 'invalid comment body')
    .exists()
    .isLength({min: 1, max: 2048});

const commentIdParamValidator = param('commentId', 'invalid commentId')
    .exists()
    .not()
    .isEmpty()
    .isNumeric();

const postIdParamValidator = param('postId', 'invalid post id')
    .exists()
    .not()
    .isEmpty()
    .isNumeric();

commentsRouter.post('/', postIdValidator, bodyValidator, validationErrorHandler, postComment);
commentsRouter.post('/:postId/:commentId', postIdParamValidator, commentIdParamValidator, bodyValidator, validationErrorHandler, postReply);
commentsRouter.get('/:postId', postIdParamValidator, pageQueryValidator, limitQueryValidator, validationErrorHandler, getComments);
commentsRouter.get('/:postId/:commentId', postIdParamValidator, commentIdParamValidator, pageQueryValidator, limitQueryValidator, validationErrorHandler, getReplies);

export default commentsRouter;