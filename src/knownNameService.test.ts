
import { KnownNameService } from './knownNameService';
import test from 'ava';

const knownName = new KnownNameService();

test('ro_md (Moldova)', t => {
    t.is(knownName.getKnownName('Moldova', 'ro', 'md').name, 'Republica Moldova');
    t.is(knownName.getKnownName('Moldovei', 'ro', 'md').name, 'Republica Moldova');
});

test('ro (Moscovei)', t => {
    t.is(knownName.getKnownName('Moscovei', 'ro', 'md').name, 'Moscova');
});

test('ro (Ștefan cel Mare) countryCodes', t => {
    t.deepEqual(knownName.getKnownName('Ștefan cel Mare', 'ro', 'md').countryCodes, ['ro', 'md']);
});
