import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import secret from './secret.js';
import User from '../../models/user.js';
import UserMeta from '../../models/user_meta.js';

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
  });

  const id = newUser.id;
  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/social-network-f5e86.appspot.com/o/profile_images%2Fdefault_profile.jpg?alt=media&token=aa9d25d5-bebc-4341-8953-68d1f97d6e51';

  await UserMeta.create({id, name, imageUrl});

  const token = jwt.sign({}, secret, {expiresIn: '1y'});

  res.json({
    'userId': id,
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
    const token = jwt.sign({
      email: user.email,
      id: user.id,
    }, secret, {
      expiresIn: '1y'
    });

    res.json({
      'userId': user.id,
      'token': token,
    });
  } else {
    next({statusCode: 401, error: new Error('unauthorized access, password or email invalid')});
  }
}

export {postSignup, postSignin};