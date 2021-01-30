import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Comment = sequelize.define("comment", {
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    timestamps: false
});

export default Comment;