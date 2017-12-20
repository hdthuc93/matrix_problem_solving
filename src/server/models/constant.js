/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Constant = sequelize.define('constant', {
  id: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rows_matrix: {
    type: Sequelize.INTEGER(4),
    allowNull: false
  },
  cols_matrix: {
    type: Sequelize.INTEGER(4),
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