/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Solution = sequelize.define('solution', {
  id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  problem_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    references: {
      model: 'problem',
      key: 'id'
    }
  },
  score_id: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    references: {
      model: 'score',
      key: 'id'
    }
  }
}, {
  tableName: 'solution'
});

export default Solution;