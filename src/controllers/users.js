import User from '../models/user.js';
import {validationResult} from 'express-validator';

const getUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({statusCode: 422, error: errors});

  const userId = req.userId;
  const user = await User.findByPk(userId, {
    attributes: ['id', 'name', 'imageUrl', 'bio']
  });
  res.json(user.toJSON());
}

export {getUser};