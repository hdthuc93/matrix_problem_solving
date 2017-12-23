/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import Problem from './problem';
import User from './user';

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
    allowNull: false
  },
  problem_id: {
    type: Sequelize.INTEGER(8),
    allowNull: false
  }
}, {
  tableName: 'submission'
});

Problem.hasMany(Submission, { foreignKey: 'problem_id', sourceKey: 'id' });
Submission.belongsTo(Problem, { foreignKey: 'problem_id', targetKey: 'id' });

User.hasMany(Submission, { foreignKey: 'user_id', sourceKey: 'id' });
Submission.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

export default Submission;