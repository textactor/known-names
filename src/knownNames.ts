
export const KNOWN_NAMES: KnownNames = require('../known-names.json');

initKnownNames();

function initKnownNames() {
    let list: KnownNameItem[] = []
    for (let lang of Object.keys(KNOWN_NAMES)) {
        list = list.concat(KNOWN_NAMES[lang].items || []);
        if (KNOWN_NAMES[lang].countries) {
            for (let country of Object.keys(KNOWN_NAMES[lang].countries)) {
                list = list.concat(KNOWN_NAMES[lang].countries[country] || []);
            }
        }
    }
    for (let item of list) {
        if (!item.known) {
            throw new Error(`'known' is required`);
        }
        const items = <string[]><any>item.search;
        if (!items.length) {
            throw new Error(`Invalid item: ${JSON.stringify(item)}`);
        }
        item.search = new RegExp(`^(${items.join('|')})$`);
    }
}

export type KnownNames = {
    [lang: string]: LanguageKnownNames
}

export type LanguageKnownNames = {
    items?: KnownNameItem[]
    countries?: {
        [country: string]: KnownNameItem[]
    }
}

export type KnownNameItem = {
    search: RegExp
    known: KnownName
}

export type KnownName = {
    name: string
    countryCodes?: string[]
}
