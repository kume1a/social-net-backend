import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const UserMeta = sequelize.define('user_meta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: false
});

export default UserMeta;