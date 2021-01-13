import {validationResult} from 'express-validator';
import UserMeta from '../models/user_meta.js';

const getUserMeta = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({statusCode: 422, error: errors});

  const id = req.params.id;

  const userMeta = await UserMeta.findByPk(id);
  res.json(userMeta.toJSON());
}

export {getUserMeta}