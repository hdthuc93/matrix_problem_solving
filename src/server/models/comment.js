/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  post_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  problem_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    references: {
      model: 'problem',
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
    tableName: 'comment'
});

export default Comment;