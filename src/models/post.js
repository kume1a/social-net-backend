import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Post = sequelize.define('post', {
  imageUrl: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likeCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  commentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Post;