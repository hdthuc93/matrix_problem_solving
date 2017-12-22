/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Constant = sequelize.define('constant', {
  id: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  min_size: {
    type: Sequelize.INTEGER(4),
    allowNull: false
  },
  max_size: {
    type: Sequelize.INTEGER(4),
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER(2),
    allowNull: false
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0'
  }
}, {
  tableName: 'constant'
});

export default Constant;