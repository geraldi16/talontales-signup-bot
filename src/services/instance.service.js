import SignUp from '../models/SignUp.model.js';
import { InstanceInputMap } from '../constants/instances.constant.js';
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

function _validateParams(params) {
    if (params.length === 0) throw new Error('No Parameter provided');

    if (!InstanceInputMap.get(params[0])) throw new Error(`Instance name is not found - input: ${params[0]}`);
}