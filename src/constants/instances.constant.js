export const InstanceName = {
    ENDLESS_TOWER: 'et',
    ANCIENT_TOWER: 'at',
    GMC: 'gmc',
    MALANGDO: 'malangdo',
    OLD_SEAL: 'oldseal',
    NEW_SEAL: 'newseal',
};

export const InstanceInput = {
    [InstanceName.ENDLESS_TOWER]: ['et', 'endless', 'endless tower'],
    [InstanceName.ANCIENT_TOWER]: ['at'],
    [InstanceName.GMC]: ['gmc'],
    [InstanceName.MALANGDO]: ['malangdo', 'ikan', 'malangdo hard'],
    [InstanceName.OLD_SEAL]: ['old seal', 'yuno', 'juno', 'old'],
    [InstanceName.NEW_SEAL]: ['fc', 'full', 'vana', 'vanaheim', 'aj', 'juperos', 'bog'],
}

export const InstanceInputMap = (() => {
    const map = new Map();

    for (const [key, values] of Object.entries(InstanceInput)) {
        values.forEach((value) => map.set(value, key));
    }

    return map;
})();

export const PartyType = {
    SMALL: 'small',
    FULL: 'party',
    FLEX: 'flex',
}

export const SetDateTimeType = {
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
}
