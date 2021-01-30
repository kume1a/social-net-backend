import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('social_net', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;