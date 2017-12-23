/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
import Constant from './constant';
import ProblemType from './problem_type';
import Events from './event';

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
    allowNull: false
  },
  event_id: {
    type: Sequelize.INTEGER(4),
    allowNull: true
  },
  constant_id: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  }
}, {
  tableName: 'problem'
});

Constant.hasMany(Problem, { foreignKey: 'constant_id', sourceKey: 'id' });
Problem.belongsTo(Constant, { foreignKey: 'constant_id', targetKey: 'id' });

ProblemType.hasMany(Problem, { foreignKey: 'problem_type_id', sourceKey: 'id' });
Problem.belongsTo(ProblemType, { foreignKey: 'problem_type_id', targetKey: 'id' });

Events.hasMany(Problem, { foreignKey: 'event_id', sourceKey: 'id' });
Problem.belongsTo(Events, { foreignKey: 'event_id', targetKey: 'id' });

export default Problem;