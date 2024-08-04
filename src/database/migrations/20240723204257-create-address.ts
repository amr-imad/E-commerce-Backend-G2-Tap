'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Address', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    state:{
        type:Sequelize.STRING,
        allowNull:false
    },
    street:{
        type:Sequelize.STRING,
        allowNull:false  
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    zipcode:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Address');
}
};