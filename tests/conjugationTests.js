import test from 'ava';
import conj from '../js/conjugation.js';

let testConjugation = (t, expected) => {
	let result = conj(expected.input);

	t.is(result.infinitive, expected.infinitive);
	t.is(result.infinitivePast, expected.infinitivePast);
	t.is(result.stem, expected.stem);
	t.is(result.stemPast, expected.stemPast);
	t.is(result.perfect, expected.perfect);
};

let cases = [
	{
		input: 'zijn~waren|ben,is~was|geweest',
		infinitive: 'zijn',
		infinitivePast: 'waren',
		stem: 'ben',
		stemPast: 'was',
		perfect: 'geweest'
	},
	{
		input: 'willen',
		infinitive: 'willen',
		infinitivePast: 'wilden',
		stem: 'wil',
		stemPast: 'wilde',
		perfect: 'gewild'
	},
	{
		input: 'werken',
		infinitive: 'werken',
		infinitivePast: 'werkten',
		stem: 'werk',
		stemPast: 'werkte',
		perfect: 'gewerkt'
	},
	{
		input: 'lopen~liepen||gelopen',
		infinitive: 'lopen',
		infinitivePast: 'liepen',
		stem: 'loop',
		stemPast: 'liep',
		perfect: 'gelopen'
	},
	{
		input: 'eten~aten|~at|gegeten',
		infinitive: 'eten',
		infinitivePast: 'aten',
		stem: 'eet',
		stemPast: 'at',
		perfect: 'gegeten'
	},
	{
		input: 'bellen',
		infinitive: 'bellen',
		infinitivePast: 'belden',
		stem: 'bel',
		stemPast: 'belde',
		perfect: 'gebeld'
	},
	{
		input: 'bedelen', // beg
		infinitive: 'bedelen',
		infinitivePast: 'bedelden',
		stem: 'bedel',
		stemPast: 'bedelde',
		perfect: 'gebedeld'
	},
	{
		input: 'be-delen', // endow
		infinitive: 'bedelen',
		infinitivePast: 'bedeelden',
		stem: 'bedeel',
		stemPast: 'bedeelde',
		perfect: 'bedeeld'
	},
	{
		input: 'halen',
		infinitive: 'halen',
		infinitivePast: 'haalden',
		stem: 'haal',
		stemPast: 'haalde',
		perfect: 'gehaald'
	},
	{
		input: 'voelen',
		infinitive: 'voelen',
		infinitivePast: 'voelden',
		stem: 'voel',
		stemPast: 'voelde',
		perfect: 'gevoeld'
	},
	{
		input: 'openen',
		infinitive: 'openen',
		infinitivePast: 'openden',
		stem: 'open',
		stemPast: 'opende',
		perfect: 'geopend'
	},
	{
		input: 'regenen',
		infinitive: 'regenen',
		infinitivePast: 'regenden',
		stem: 'regen',
		stemPast: 'regende',
		perfect: 'geregend'
	},
	{
		input: 'be-kennen',
		infinitive: 'bekennen',
		infinitivePast: 'bekenden',
		stem: 'beken',
		stemPast: 'bekende',
		perfect: 'bekend'
	},
	{
		input: 'beteren',
		infinitive: 'beteren',
		infinitivePast: 'beterden',
		stem: 'beter',
		stemPast: 'beterde',
		perfect: 'gebeterd'
	},
	{
		input: 'menen',
		infinitive: 'menen',
		infinitivePast: 'meenden',
		stem: 'meen',
		stemPast: 'meende',
		perfect: 'gemeend'
	},
	{
		input: 'ver-gaderen',
		infinitive: 'vergaderen',
		infinitivePast: 'vergaderden',
		stem: 'vergader',
		stemPast: 'vergaderde',
		perfect: 'vergaderd'
	},
	{
		input: 'oefenen',
		infinitive: 'oefenen',
		infinitivePast: 'oefenden',
		stem: 'oefen',
		stemPast: 'oefende',
		perfect: 'geoefend'
	},
	{
		input: 'uiten',
		infinitive: 'uiten',
		infinitivePast: 'uitten',
		stem: 'uit',
		stemPast: 'uitte',
		perfect: 'geuit'
	},
	{
		input: 'wandelen',
		infinitive: 'wandelen',
		infinitivePast: 'wandelden',
		stem: 'wandel',
		stemPast: 'wandelde',
		perfect: 'gewandeld'
	},
	{
		input: 'ver-delen',
		infinitive: 'verdelen',
		infinitivePast: 'verdeelden',
		stem: 'verdeel',
		stemPast: 'verdeelde',
		perfect: 'verdeeld'
	},
	{
		input: 'ge-loven',
		infinitive: 'geloven',
		infinitivePast: 'geloofden',
		stem: 'geloof',
		stemPast: 'geloofde',
		perfect: 'geloofd'
	},
	{
		input: 'ver-liezen~ver-loren||verloren',
		infinitive: 'verliezen',
		infinitivePast: 'verloren',
		stem: 'verlies',
		stemPast: 'verloor',
		perfect: 'verloren'
	}
];

// Interesting cases: zien, doen, gaan, kunnen

cases.forEach(c => test(`conjugation of '${c.infinitive}'`, testConjugation, c));
