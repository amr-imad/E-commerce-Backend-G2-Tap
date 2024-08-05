'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Users', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    loginId:{
        type: Sequelize.INTEGER,
        // allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    firstName:{
        type: new Sequelize.STRING,
       allowNull: false
    },
    lastName:{
        type: new Sequelize.STRING,
       allowNull: false
    },
    DOB:{
      type:Sequelize.DATE,
      allowNull:false
    },
    image:{
        type :Sequelize.STRING,
        allowNull:false
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Users');
}
};