const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Projeto = sequelize.define('Projeto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "projetos",
    timestamps: false
});

module.exports = Projeto;
