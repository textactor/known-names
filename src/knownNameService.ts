
import { KNOWN_NAMES, KnownNames, KnownName } from './knownNames';

export interface IKnownNameService {
    getKnownName(name: string, lang: string, country: string): KnownName
}

export class KnownNameService implements IKnownNameService {
    private data: KnownNames

    constructor(data?: KnownNames) {
        this.data = data || KNOWN_NAMES;
    }

    getKnownName(name: string, lang: string, country: string): KnownName {
        if (this.data[lang]) {
            let items = this.data[lang].items;
            if (items) {
                for (let item of items) {
                    if (item.search.test(name)) {
                        return item.known;
                    }
                }
            }
            if (this.data[lang].countries) {
                items = this.data[lang].countries[country];
                if (items) {
                    for (let item of items) {
                        if (item.search.test(name)) {
                            return item.known;
                        }
                    }
                }
            }
        }
    }
}
