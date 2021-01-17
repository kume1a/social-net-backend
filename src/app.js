import pkg from 'body-parser';
import express from 'express';
import {on404, onError} from './controllers/error.js';
import sequelize from './models/db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import authCheck from './controllers/auth/auth_check.js';
import searchRouter from './routes/search.js';

const {json} = pkg;

const port = 8080;
const host = 'localhost';
const app = express();

app.use(json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');

  next();
})

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/search', authCheck, searchRouter);

// noinspection JSCheckFunctionSignatures
app.use(on404);
app.use(onError);

try {
  await sequelize.sync({force: false});
  app.listen(port, host, () => console.log(`app: server available at http://${host}:${port}`));
} catch (e) {
  console.log(`app: ${e}`);
}