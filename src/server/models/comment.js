/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import Problem from './problem';
import User from './user';

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
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false
  }
}, {
    tableName: 'comment'
});

Problem.hasMany(Comment, { foreignKey: 'problem_id', sourceKey: 'id' });
Comment.belongsTo(Problem, { foreignKey: 'problem_id', targetKey: 'id' });

User.hasMany(Comment, { foreignKey: 'user_id', sourceKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

export default Comment;