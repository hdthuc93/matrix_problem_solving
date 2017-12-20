/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Submission = sequelize.define('submission', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  result: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  user_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  problem_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    references: {
      model: 'problem',
      key: 'id'
    }
  }
}, {
  tableName: 'submission'
});

export default Submission;