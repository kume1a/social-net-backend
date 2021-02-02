import express from 'express';
import validationErrorHandler from '../controllers/core/errorHandler.js';
import {imageUrlValidator, limitQueryValidator, pageQueryValidator, userIdParamValidator} from './core/validators.js';
import {getFeedStories, getUserStories, postStory} from '../controllers/stories.js';

const storiesRouter = express.Router();

storiesRouter.post('/', imageUrlValidator, validationErrorHandler, postStory);
storiesRouter.get('/user/:userId', userIdParamValidator, validationErrorHandler, getUserStories);
storiesRouter.get('/feed', pageQueryValidator, limitQueryValidator, validationErrorHandler, getFeedStories);

export default storiesRouter;