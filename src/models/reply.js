import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Reply = sequelize.define("reply", {
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

export default Reply;