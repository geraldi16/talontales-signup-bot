export const JobName = {
    LK: 'LordKnight',
    PALADIN: 'Paladin',
    SNIPER: 'Sniper',
    CLOWN: 'Clown',
    GYPSY: 'Gypsy',
    CHAMP: 'Champ',
    HP: 'HP',
    WHITESMITH: 'Whitesmith',
    BIOCHEMIST: 'Biochemist',
    SINX: 'Sinx',
    STALKER: 'Stalker',
    PROFESSOR: 'Professor',
    HIGHWIZARD: 'HighWizard',
    SOULLINKER: 'SoulLinker',
    STARGLADIATOR: 'StarGladiator',
    GUNSLINGER: 'Gunslinger',
    NINJA: 'Ninja',
    SUNO: 'SuperNovice',
};

export const JobListPriority = {
    LK: 8,
    PALADIN: 2,
    SNIPER: 7,
    CLOWN: 13,
    GYPSY: 12,
    CHAMP: 1,
    HP: 4,
    WHITESMITH: 9,
    BIOCHEMIST: 5,
    SINX: 11,
    STALKER: 10,
    PROFESSOR: 3,
    HIGHWIZARD: 6,
    SOULLINKER: 15,
    STARGLADIATOR: 14,
    GUNSLINGER: 17,
    NINJA: 16,
    SUNO: 18,
    FLEX: 999,
};

export const JobInput = {
    [JobName.LK]: ['lk', 'lord', 'knight', 'lordknight'],
    [JobName.PALADIN]: ['paladin', 'pally', 'crus', 'crusader'],
    [JobName.SNIPER]: ['sniper', 'hunter', 'snip'],
    [JobName.CLOWN]: ['clown', 'bard'],
    [JobName.GYPSY]: ['gypsy', 'dancer'],
    [JobName.CHAMP]: ['champ', 'champion', 'asura'],
    [JobName.HP]: ['hp', 'highpriest', 'priest'],
    [JobName.WHITESMITH]: ['ws', 'whitesmith', 'bs', 'blacksmith', 'ms'],
    [JobName.BIOCHEMIST]: ['bio', 'creator', 'biochemist', 'alchemist'],
    [JobName.SINX]: ['sinx', 'sin', 'assassinx', 'assassincross', 'assassin'],
    [JobName.STALKER]: ['stalker', 'rogue'],
    [JobName.PROFESSOR]: ['professor', 'prof', 'sage', 'scholar'],
    [JobName.HIGHWIZARD]: ['hw', 'highwiz', 'wizard', 'mage', 'highwizard'],
    [JobName.SOULLINKER]: ['sl', 'soullinker', 'linker', 'link'],
    [JobName.STARGLADIATOR]: ['stargladiator', 'taekwon', 'sg', 'taekwonmaster'],
    [JobName.GUNSLINGER]: ['gs', 'guns', 'gun', 'gunslinger'],
    [JobName.NINJA]: ['ninja'],
    [JobName.SUNO]: ['novice', 'suno', 'supernovice'],
}

export const JobInputMap = (() => {
    const map = new Map();

    for (const [key, values] of Object.entries(JobInput)) {
        values.forEach((value) => map.set(value, key));
    }

    return map;
})();
