import pkg from 'sequelize';
import sequelize from './db.js';

const {DataTypes} = pkg;

const Story = sequelize.define('story', {
    imageUrl: {
        type: DataTypes.STRING(1024),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    timestamps: false
});

export default Story;