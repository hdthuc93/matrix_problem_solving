/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import bcrypt from 'bcrypt';

// let _bcrypt = Promise.all([bcrypt]);

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  real_name: {
    type: Sequelize.STRING(55),
    allowNull: false
  },
  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: true
  },
  mobile_number: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  user_type_id: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    references: {
      model: 'user_type',
      key: 'id'
    }
  }
}, {
  tableName: 'user'
});

User.beforeCreate((user, options) => {
  return bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt, null);
    })
    .then(hash => {
      user.setDataValue('password', hash);
    })
    .catch(err => {
      console.log(err);
      return sequelize.Promise.reject(err);
    });
});

export default User;