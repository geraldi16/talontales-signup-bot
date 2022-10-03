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
    RESERVE: 'reserve',
    FLEX: 'Flexible',
};

export const JobListPriority = {
    [JobName.LK]: 8,
    [JobName.PALADIN]: 2,
    [JobName.SNIPER]: 7,
    [JobName.CLOWN]: 13,
    [JobName.GYPSY]: 12,
    [JobName.CHAMP]: 1,
    [JobName.HP]: 4,
    [JobName.WHITESMITH]: 9,
    [JobName.BIOCHEMIST]: 5,
    [JobName.SINX]: 11,
    [JobName.STALKER]: 10,
    [JobName.PROFESSOR]: 3,
    [JobName.HIGHWIZARD]: 6,
    [JobName.SOULLINKER]: 15,
    [JobName.STARGLADIATOR]: 14,
    [JobName.GUNSLINGER]: 17,
    [JobName.NINJA]: 16,
    [JobName.SUNO]: 18,
    [JobName.FLEX]: 999,
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
    [JobName.FLEX]: ['flexible', 'flex'],
}

export const JobInputMap = (() => {
    const map = new Map();

    for (const [key, values] of Object.entries(JobInput)) {
        values.forEach((value) => map.set(value, key));
    }

    return map;
})();
