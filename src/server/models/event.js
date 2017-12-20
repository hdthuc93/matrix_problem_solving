/* jshint indent: 2 */
import { sequelize, Sequelize } from './index-model';

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  start_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  time: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  }
}, {
  tableName: 'event'
});

export default Event;