/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Problem = sequelize.define('problem', {
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
  is_public: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: '0'
  },
  num_of_submits: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: '0'
  },
  num_of_correct_ans: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: '0'
  },
  problem_type_id: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    references: {
      model: 'problem_type',
      key: 'id'
    }
  },
  event_id: {
    type: Sequelize.INTEGER(4),
    allowNull: true,
    references: {
      model: 'event',
      key: 'id'
    }
  },
  constant_id: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    references: {
      model: 'constants',
      key: 'id'
    }
  }
}, {
  tableName: 'problem'
});

export default Problem;