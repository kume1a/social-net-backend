import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const CommentCount = sequelize.define('comment_count', {
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: false
});

export default CommentCount;