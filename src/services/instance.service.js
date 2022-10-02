import { EmbedBuilder } from 'discord.js';

import SignUp from '../models/SignUp.model.js';
import { InstanceInputMap } from '../constants/instances.constant.js';
import { InstanceTemplate } from '../templates/instanceData.template.js';

export async function setUpNewInstance(params, channelId) {
    _validateParams(params);

    const instanceName = InstanceInputMap.get(params[0]);
    const templateData = InstanceTemplate[instanceName];
    templateData.channelId = channelId;

    // if sign up already exist, replace to new one
    const existingData = await SignUp.findOne({ where: { channelId }});

    if (existingData) {
        existingData.instanceName = templateData.instanceName;
        existingData.playerLimit = templateData.playerLimit;
        existingData.reserveLimit = templateData.reserveLimit;
        existingData.playerList = templateData.playerList;
        existingData.reserveList = [];
        existingData.notes = null;
        existingData.dateTime = null;
        await existingData.save();
    } else {
        await SignUp.create(templateData);
    }

    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(templateData.instanceName)
        .setDescription('Party List:')
        .addFields(_renderPlayerList(templateData.playerList))
        .addFields({
            name: 'Notes',
            value: '\u200B',
        })
        .setFooter({
            text: `0 of ${templateData.playerLimit} taken.`
        });
}

function _validateParams(params) {
    if (params.length === 0) throw new Error('No Parameter provided');

    if (!InstanceInputMap.get(params[0])) throw new Error(`Instance name is not found - input: ${params[0]}`);
}

function _renderPlayerList(playerList) {
    const valueString = playerList.reduce((result, value) => {
        return result + `${value.job}: ${value.player?.username ?? ''} ${value.playerIGN ? `(${value.playerIGN})` : ''} \n`;
    }, '');

    return { name: '\u200B', value: valueString };
}