import pkg from 'body-parser';
import express from 'express';
import {on404, onError} from './controllers/error.js';
import sequelize from './models/db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import authCheck from './controllers/auth/auth_check.js';
import searchRouter from './routes/search.js';
import User from './models/user.js';
import Post from './models/post.js';
import postsRouter from './routes/posts.js';
import Like from './models/like.js';
import LikeCount from './models/likeCount.js';
import Comment from './models/comment.js';
import Reply from './models/reply.js';
import commentsRouter from './routes/comments.js';
import CommentCount from './models/commentCount.js';

const {json} = pkg;

const port = 8080;
const host = '127.0.0.1';
const app = express();

app.use(json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');

  next();
})

app.use('/auth', authRouter);
app.use('/users', authCheck, userRouter);
app.use('/search', authCheck, searchRouter);
app.use('/posts', authCheck, postsRouter);
app.use('/comments', authCheck, commentsRouter);

// noinspection JSCheckFunctionSignatures
app.use(on404);
app.use(onError);

try {
  User.hasMany(Post);
  Post.belongsTo(User);

  User.hasMany(Like);
  Post.hasMany(Like);
  Like.belongsTo(Post);

  Post.hasOne(LikeCount);
  LikeCount.belongsTo(Post);

  Post.hasMany(Comment);
  Post.hasMany(Reply);
  Comment.belongsTo(Post);
  Comment.hasMany(Reply);
  Reply.belongsTo(Comment);
  User.hasMany(Comment);
  User.hasMany(Reply);

  Post.hasOne(CommentCount);
  CommentCount.belongsTo(Post);

  await sequelize.sync({force: false});
  app.listen(port, host, () => console.log(`app: server available at http://${host}:${port}`));
} catch (e) {
  console.log(`app: ${e}`);
}