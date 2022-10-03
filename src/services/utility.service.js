import { EmbedBuilder } from 'discord.js';

import SignUp from '../models/SignUp.model.js';

export async function validateAndGetSignupData(channelId) {
    const signup = await SignUp.findOne({ where: { channelId } });

    if (!signup) throw new Error('Sign up is not found. Please start sign up using `!new <instancename>`');

    if (_getTakenSpot(signup.playerList) >= signup.playerLimit) {
        throw new Error('Sign up has reach limit. Please type `!add reserve`');
    }

    return signup;
}

export function buildSignupEmbedMessage(signupData) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(signupData.instanceName)
        .setDescription('Party List:')
        .addFields(_renderPlayerList(signupData.playerList))
        .addFields(_renderReserveList(signupData.reserveList))
        .addFields({
            name: 'Notes',
            value: '\u200B',
        })
        .addFields({
            name: 'When',
            value: '\u200B',
        })
        .setFooter({
            text: `${_getTakenSpot(signupData.playerList)} of ${signupData.playerLimit} taken.`
        });
}

function _renderPlayerList(playerList) {
    const valueString = playerList.reduce((result, value) => {
        return result + `${value.job}: ${value.player?.username ?? ''} ${value.playerIGN ? `(${value.playerIGN})` : ''} \n`;
    }, '');

    return { name: '\u200B', value: valueString };
}

function _renderReserveList(reserveList) {
    const valueString = reserveList.reduce((result, value) => {
        return result + `Reserve: ${value.player?.username ?? ''} \n`;
    }, '');

    return { name: 'Reserve List', value: valueString };
}

function _getTakenSpot(playerList) {
    return playerList.reduce((total, data) => {
        if (data.player) return total + 1;
        return total;
    }, 0);
}