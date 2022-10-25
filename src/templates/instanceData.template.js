import { InstanceName, PartyType } from '../constants/instances.constant.js';
import { getPartyListTemplate, getReserveListTemplate } from './playerListData.template.js';

export const InstanceTemplate = {
    [InstanceName.ENDLESS_TOWER]: {
        channelId: '',
        instanceName: InstanceName.ENDLESS_TOWER,
        playerLimit: 12,
        playerList: getPartyListTemplate(PartyType.SMALL, 12),
        reserveLimit: 5,
        reserveList: getReserveListTemplate(5),
        notes: null,
        dateTime: null,
    },
    [InstanceName.ANCIENT_TOWER]: {
        channelId: '',
        instanceName: InstanceName.ANCIENT_TOWER,
        playerLimit: 12,
        playerList: getPartyListTemplate(PartyType.FULL, 12),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(5),
        notes: null,
        dateTime: null,
    },
    [InstanceName.GMC]: {
        channelId: '',
        instanceName: InstanceName.GMC,
        playerLimit: 12,
        playerList: getPartyListTemplate(PartyType.SMALL, 12),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
    [InstanceName.MALANGDO]: {
        channelId: '',
        instanceName: InstanceName.MALANGDO,
        playerLimit: 12,
        playerList: getPartyListTemplate(PartyType.FLEX, 12),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
    [InstanceName.OLD_SEAL]: {
        channelId: '',
        instanceName: InstanceName.OLD_SEAL,
        playerLimit: 6,
        playerList: getPartyListTemplate(PartyType.FLEX, 6),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
    [InstanceName.NEW_SEAL]: {
        channelId: '',
        instanceName: InstanceName.NEW_SEAL,
        playerLimit: 6,
        playerList: getPartyListTemplate(PartyType.FLEX, 6),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
    [InstanceName.BAKONAWA]: {
        channelId: '',
        instanceName: InstanceName.NEW_SEAL,
        playerLimit: 6,
        playerList: getPartyListTemplate(PartyType.FLEX, 12),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
    [InstanceName.OGH]: {
        channelId: '',
        instanceName: InstanceName.NEW_SEAL,
        playerLimit: 6,
        playerList: getPartyListTemplate(PartyType.FLEX, 7),
        reserveLimit: 3,
        reserveList: getReserveListTemplate(3),
        notes: null,
        dateTime: null,
    },
};
