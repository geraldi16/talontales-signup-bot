import { DataTypes } from 'sequelize';
import { sequelize } from '../database.cjs';

export default sequelize.define('sign-ups', {
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
})