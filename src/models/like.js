import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Like = sequelize.define('like', {}, {
  timestamps: false,
});

export default Like;