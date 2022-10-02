'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (migration, DataTypes) {
    await migration.createTable('sign-ups', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instanceName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      playerLimit: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      reserveLimit: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      playerList: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
      },
      reserveList: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
      },
      notes: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      dateTime: {
          type: DataTypes.DATE,
          allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down (migration) {
    await migration.dropTable('sign-ups');
  }
};