import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/social-network-f5e86.appspot.com/o/profile_images%2Fdefault_profile.jpg?alt=media&token=aa9d25d5-bebc-4341-8953-68d1f97d6e51';

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
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: defaultImageUrl
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
});

export default User;

