import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Follow = sequelize.define('follow', {
  followeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
});

export default Follow;