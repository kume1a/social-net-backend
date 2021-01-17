import {validationResult} from 'express-validator';
import User from '../models/user.js';
import pkg from 'sequelize';

const {Op} = pkg;

const getUsers = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({statusCode: 422, error: errors});

  const query = req.params.query;
  const users = await User.findAll({
    where: {
      name: {[Op.like]: `%${query}%`}
    }
  });

  res.json(users);
};

export {getUsers};