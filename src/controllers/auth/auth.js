import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import secret from './secret.js';
import User from '../../models/user.js';

const postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({statusCode: 422, error: errors});

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({where: {email: email}});
  if (user != null) {
    return next({statusCode: 409, error: new Error('conflict in sing up, user already exists')});
  }

  const salt = await bcrypt.genSalt(16);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email: email,
    password: passwordHash,
    name: name,
  });

  const userId = newUser.id;
  const token = getToken(userId);

  res.json({
    'userId': userId,
    'token': token,
  });
};

const postSignin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({statusCode: 422, error: errors});

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({where: {email: email}});
  if (user == null) {
    return next({statusCode: 401, error: new Error('unauthorized access, password or email invalid')});
  }

  const correctCredentials = await bcrypt.compare(password, user.password);

  if (correctCredentials) {
    const token = getToken(user.id)

    res.json({
      'userId': user.id,
      'token': token,
    });
  } else {
    next({statusCode: 401, error: new Error('unauthorized access, password or email invalid')});
  }
}

const getToken = (userId) => {
  return jwt.sign({
    userId: userId,
  }, secret, {
    expiresIn: '2y'
  });
}

export {postSignup, postSignin};