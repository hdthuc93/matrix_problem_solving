/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const UserType = sequelize.define('user_type', {
  id: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type_name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'user_type'
});

export default UserType;