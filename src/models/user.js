import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/social-network-f5e86.appspot.com/o/profile%2Fdefault_profile.jpg?alt=media&token=ae2796f1-8acc-4b78-9d15-8b683c0786f3';

const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    defaultValue: defaultImageUrl
  },
});

export default User;

