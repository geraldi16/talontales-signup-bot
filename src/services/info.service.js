import { EmbedBuilder } from 'discord.js';

import { InstanceInput } from '../constants/instances.constant.js';
import { JobInput } from '../constants/job.constant.js';

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
                name: '`!instancelist`',
                value: 'show available instance names that can be used.',
            },
            {
                name: '`!joblist`',
                value: 'show available job names that can be used.',
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
                name: '`!show`',
                value: 'Show latest sign up table.',
            },
            {
                name: '`!swap <jobname>`',
                value: 'Change your current job to the designated job.\n example: `!swap bio`',
            },
        )
}

export function showInfoInstance() {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Available Instance Command Lists')
        .setDescription('Usable commands listed below:')
        .addFields(_getInstanceList());
}

export function showInfoJob() {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Available Job Command Lists')
        .setDescription('Usable commands listed below:')
        .addFields(_getJobList());
}

function _getInstanceList() {
    const list = [];

    for (const [key, values] of Object.entries(InstanceInput)) {
        list.push({ name: key, value: values.join(', ') });
    }
    return list;
}

function _getJobList() {
    const list = [];

    for (const [key, values] of Object.entries(JobInput)) {
        list.push({ name: key, value: values.join(', ') });
    }
    return list;
}