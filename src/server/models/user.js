/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import bcrypt from 'bcrypt';
import UserType from './user_type';

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
    allowNull: false
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


UserType.hasMany(User, { foreignKey: 'user_type_id', sourceKey: 'id' });
User.belongsTo(UserType, { foreignKey: 'user_type_id', targetKey: 'id' });

export default User;