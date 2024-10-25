const Sequelize = require('sequelize');

const sequelize = new Sequelize ('node1', 'root', 'amit', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;