const Sequelize = require('sequelize');

const sequelize= require('./database');
const Student= require('./student');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('present', 'absent'),
        allowNull: false
    } 
});

// Establish relationship: A Student can have many attendance records
Student.hasMany(Attendance, { onDelete: 'CASCADE' });
Attendance.belongsTo(Student);

module.exports = Attendance;