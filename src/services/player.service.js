import { EmbedBuilder } from 'discord.js';
import { JobInputMap, JobListPriority, JobName } from '../constants/job.constant.js';

import SignUp from '../models/SignUp.model.js';
import { buildSignupEmbedMessage, validateAndGetSignupData } from './utility.service.js';

export async function addNewPlayer(playerData, channelId, params) {
    const signup = await validateAndGetSignupData(channelId);

    // check if param is reserve
    if (params[0] === JobName.RESERVE) {
        if (signup.reserveList >= signup.reserveLimit) {
            throw new Error('Reserve limit has been reached :(')
        } else {
            _insertReservePlayer(signup.reserveList, playerData);
            signup.changed('reserveList', true);
        }
    } else {
        // check if jobname is valid
        if (JobInputMap.get(params[0])) {
            _insertAndSortPlayerData(signup.playerList, playerData, JobInputMap.get(params[0]));
            signup.changed('playerList', true);
            // remove from reserve, if you are there
            for (let i=0; i<signup.reserveList.length; i++) {
                if (signup.reserveList[i].player && signup.reserveList[i].player.id === playerData.id) {
                    signup.reserveList[i].player = null;
                }
            }
        }
    }
    await signup.save();

    return buildSignupEmbedMessage(signup);
}

export async function removePlayer(playerId, channelId) {
    const signup = await validateAndGetSignupData(channelId);
    let removed = false;

    // remove from player list
    for (let i=0; i<signup.playerList.length; i++) {
        if (signup.playerList[i].player && signup.playerList[i].player.id === playerId) {
            signup.playerList[i].player = null;
            removed = true;
            signup.changed('playerList', true);
        }
    }

    // remove from reserve list
    for (let i=0; i<signup.reserveList.length; i++) {
        if (signup.reserveList[i].player && signup.reserveList[i].player.id === playerId) {
            signup.reserveList[i].player = null;
            removed = true;
            signup.changed('reserveList', true);
        }
    }
    if (!removed) throw new Error('You are not signed into this run. Why remove yourself? XD');

    await signup.save();
    return buildSignupEmbedMessage(signup);

}

export async function pingPlayer(channelId) {
    const signup = await validateAndGetSignupData(channelId);

    let result = '';

    signup.playerList.forEach((player) => {
        if (player.player) {
            result += `<@${player.player.id}> `
        }
    })
    result += 'Lets get readyy! We are about to sail soon!!';

    return result;
}

export async function swapJob(channelId, playerData, params) {
    const signup = await validateAndGetSignupData(channelId);

    const newJob = params[0];
    if (JobInputMap.get(newJob)) {
        // get current job
        const currentJob = [];
        let currentJobNumber = -1;
        
        for(let i = 0; i < signup.playerList.length; i ++) {
            if (signup.playerList[i].player?.id === playerData.id) {
                currentJob.push(signup.playerList[i]);
                currentJobNumber = i;
                break;
            }
        }

        if (currentJob.length === 0) throw new Error('You are not registered in the sign up yet!!');

        // swap job
        try {
            _insertAndSortPlayerData(signup.playerList, playerData, JobInputMap.get(newJob));
            signup.playerList[currentJobNumber].player = null;
        } catch (error) {
            // this means no job available
            // change the current job instead
            signup.playerList[currentJobNumber].job = JobInputMap.get(newJob);
        }
        signup.changed('playerList', true);
    }

    await signup.save();
    return buildSignupEmbedMessage(signup);
}

function _insertReservePlayer(reserveList, playerData) {
    let inserted = false;
    for (let i=0; i<reserveList.length; i++) {
        if (!reserveList[i].player) {
            reserveList[i].player = playerData;
            inserted = true;
            break;
        }
    }

    if (!inserted) throw new Error('Reserve is full :( Sorry');
}

function _insertAndSortPlayerData(playerList, playerData, jobName) {
    let inserted = false;
    let fromFlex = false;

    for (let i=0; i<playerList.length; i++) {
        if (playerList[i].job === JobName.FLEX && !playerList[i].player) {
            fromFlex = true;
            inserted = true;
            playerList[i].player = playerData;
            playerList[i].job = jobName;
            break;
        }

        if (playerList[i].job === jobName && !playerList[i].player) {
            inserted = true;
            playerList[i].player = playerData;
            break;
        }
    }

    if (!inserted) throw new Error('The job you want is occupied already. Please pick other job');

    if (fromFlex) {
        _sortPlayerList(playerList);
    }
}

function _sortPlayerList(playerList) {
    let minIndex;

    for (let i=0; i<playerList.length - 1; i++) {
        minIndex = i;
        for (let j=i+1; j<playerList.length; j++) {
            if (JobListPriority[playerList[j].job] < JobListPriority[playerList[minIndex].job]) {
                minIndex = j;
            }
        }
        // swap the data
        const temp = playerList[minIndex];
        playerList[minIndex] = playerList[i];
        playerList[i] = temp;
    }
}
