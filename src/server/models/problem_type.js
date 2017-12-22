/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const ProblemType = sequelize.define('problem_type', {
  id: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type_name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  type_index: {
    type: Sequelize.INTEGER(2),
    allowNull: false
  }
}, {
  tableName: 'problem_type'
});

export default ProblemType;
