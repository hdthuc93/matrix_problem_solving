/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';
const Score = sequelize.define('score', {
  id: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  score_number: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  }
}, {
  tableName: 'score'
});

export default Score;