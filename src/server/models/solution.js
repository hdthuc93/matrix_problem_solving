/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import Problem from './problem';
import Score from './score';

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
    allowNull: false
  },
  score_id: {
    type: Sequelize.INTEGER(4),
    allowNull: false
  }
}, {
  tableName: 'solution'
});

Problem.hasMany(Solution, { foreignKey: 'problem_id', sourceKey: 'id' });
Solution.belongsTo(Problem, { foreignKey: 'problem_id', targetKey: 'id' });

Score.hasMany(Solution, { foreignKey: 'score_id', sourceKey: 'id' });
Solution.belongsTo(Score, { foreignKey: 'score_id', targetKey: 'id' });

export default Solution;