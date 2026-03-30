import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Attendance extends Model {}

Attendance.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkInTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  checkOutTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hoursWorked: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'leave'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Attendance',
  tableName: 'attendances',
});

export default Attendance;