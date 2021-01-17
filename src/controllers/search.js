import User from '../models/user.js';
import pkg from 'sequelize';

const {Op} = pkg;

const getUsers = async (req, res, next) => {
  const query = req.params.query;
  const users = await User.findAll({
    where: {
      id: {[Op.not]: req.userId},
      name: {[Op.like]: `%${query}%`,},
    }
  });

  res.json(users);
};

export {getUsers};