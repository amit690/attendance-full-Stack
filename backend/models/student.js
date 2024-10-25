const Sequelize= require('sequelize');


const sequelize = require('./database');


const Student = sequelize.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Student;