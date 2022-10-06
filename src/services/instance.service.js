import moment from 'moment';

import SignUp from '../models/SignUp.model.js';
import { InstanceInputMap, SetDateTimeType } from '../constants/instances.constant.js';
import { InstanceTemplate } from '../templates/instanceData.template.js';
import { buildSignupEmbedMessage, validateAndGetSignupData } from './utility.service.js';

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
        existingData.reserveList = templateData.reserveList;
        existingData.notes = null;
        existingData.dateTime = null;
        await existingData.save();
    } else {
        await SignUp.create(templateData);
    }

    return buildSignupEmbedMessage(templateData);
}

export async function showLatestSignup(channelId) {
    const signup = await validateAndGetSignupData(channelId);

    return buildSignupEmbedMessage(signup);
}

export async function setDateTime(channelId, type, date) {
    const DATE_FORMAT = 'DD/MM';
    const TIME_FORMAT = 'HH:mm';
    const signup = await validateAndGetSignupData(channelId);
    const existingDate = signup.dateTime ? moment(signup.dateTime) : moment();

    // validate input base on type
    if (type === SetDateTimeType.DATE) {
        if (!moment(date, DATE_FORMAT, true).isValid()) {
            throw new Error(`Please check if format is \`${DATE_FORMAT}\``);
        }
        const dateSplit = date.split('/');
        const dateTime = existingDate
            .set('date', dateSplit[0])
            .set('month', parseInt(dateSplit[1], 10) - 1);
        signup.dateTime = dateTime;
    } else if (type === SetDateTimeType.TIME) {
        if (!moment(date, TIME_FORMAT, true).isValid()) {
            throw new Error(`Please check if format is \`${TIME_FORMAT}\``);
        }
        const timeSplit = date.split(':');
        const dateTime = existingDate
            .tz('America/Los_Angeles')
            .set('hour', timeSplit[0])
            .set('minute', timeSplit[1]);
        signup.dateTime = dateTime;
    } else if (type === SetDateTimeType.DATETIME) {
        const format = `${DATE_FORMAT} ${TIME_FORMAT}`;
        if (!moment(date, format, true).isValid()) {
            throw new Error(`Please check if format is \`${format}\``);
        }

        const dateSplit = date.split(' ')[0].split('/');
        const timeSplit = date.split(' ')[1].split(':');
        const dateTime = existingDate
            .tz('America/Los_Angeles')
            .set('date', dateSplit[0])
            .set('month', parseInt(dateSplit[1], 10) - 1)
            .set('hour', timeSplit[0])
            .set('minute', timeSplit[1]);
        signup.dateTime = dateTime;
    }

    await signup.save();
    return buildSignupEmbedMessage(signup);
}

export async function setNote(channelId, message) {
    const signup = await validateAndGetSignupData(channelId);
    signup.notes = message;
    await signup.save();
    return buildSignupEmbedMessage(signup);
}

function _validateParams(params) {
    if (params.length === 0) throw new Error('No Parameter provided');

    if (!InstanceInputMap.get(params[0])) throw new Error(`Instance name is not found - input: ${params[0]}`);
}