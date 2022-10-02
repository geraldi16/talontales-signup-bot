import { EmbedBuilder } from 'discord.js';

import { InstanceInput } from '../constants/instances.constant.js';

export function showInfo() {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Command Lists')
        .setDescription('Usable commands listed below:')
        .addFields(
            {
                name: '\u200B',
                value: '\u200B',
            },
            {
                name: '`!info`',
                value: 'show usable command lists.',
            },
            {
                name: '`!new <instancename>`',
                value: 'Create new sign up for instance.\n example: `!new fc`',
            },
            {
                name: '`!add <jobname>`',
                value: 'Register yourself to the board.\n example: `!add sniper`',
            },
            {
                name: '`!remove`',
                value: 'Remove yourself from board.',
            },
            {
                name: '`!swap <jobname>`',
                value: 'Change your current job to the designated job.\n example: `!swap bio`',
            },
            {
                name: '\u200B',
                value: '\u200B',
            },
        )
        .addFields(_getInstanceList());
}

function _getInstanceList() {
    const list = [{ name: '<instancename> list available', value: '\u200B' }];

    for (const [key, values] of Object.entries(InstanceInput)) {
        list.push({ name: key, value: values.join(', ') });
    }
    return list;
}