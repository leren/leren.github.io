import test from 'ava';
import conj from '../js/conjugation.js';

let testConjugation = (t, expected) => {
	let result = conj(expected.input);

	t.is(result.present.pl, expected.present.pl);
	t.is(result.present.sg.first, expected.present.sg.first);
	t.is(result.present.sg.second, expected.present.sg.second);
	t.is(result.present.sg.third, expected.present.sg.third);
	t.is(result.past.pl, expected.past.pl);
	t.is(result.past.sg, expected.past.sg);
	t.is(result.perfect, expected.perfect);
};

let cases = [
	{
		input: 'zijn~waren|ben,,is~was|geweest',
		present: {
			pl: 'zijn',
			sg: {
				first: 'ben',
				second: 'bent',
				third: 'is'
			}
		},
		past: {
			pl: 'waren',
			sg: 'was'
		},
		perfect: 'geweest'
	},
	{
		input: 'willen|,,wil',
		present: {
			pl: 'willen',
			sg: {
				first: 'wil',
				second: 'wilt',
				third: 'wil'
			}
		},
		past: {
			pl: 'wilden',
			sg: 'wilde'
		},
		perfect: 'gewild'
	},
	{
		input: 'werken',
		present: {
			pl: 'werken',
			sg: {
				first: 'werk',
				second: 'werkt',
				third: 'werkt'
			}
		},
		past: {
			pl: 'werkten',
			sg: 'werkte'
		},
		perfect: 'gewerkt'
	},
	{
		input: 'lopen~liepen||gelopen',
		present: {
			pl: 'lopen',
			sg: {
				first: 'loop',
				second: 'loopt',
				third: 'loopt'
			}
		},
		past: {
			pl: 'liepen',
			sg: 'liep'
		},
		perfect: 'gelopen'
	},
	{
		input: 'eten~aten|~at|gegeten',
		present: {
			pl: 'eten',
			sg: {
				first: 'eet',
				second: 'eet',
				third: 'eet'
			}
		},
		past: {
			pl: 'aten',
			sg: 'at'
		},
		perfect: 'gegeten'
	},
	{
		input: 'bellen',
		present: {
			pl: 'bellen',
			sg: {
				first: 'bel',
				second: 'belt',
				third: 'belt'
			}
		},
		past: {
			pl: 'belden',
			sg: 'belde'
		},
		perfect: 'gebeld'
	},
	{
		input: 'bedelen',
		present: {
			pl: 'bedelen',
			sg: {
				first: 'bedel',
				second: 'bedelt',
				third: 'bedelt'
			}
		},
		past: {
			pl: 'bedelden',
			sg: 'bedelde'
		},
		perfect: 'gebedeld'
	},
	{
		input: 'be-delen',
		present: {
			pl: 'bedelen',
			sg: {
				first: 'bedeel',
				second: 'bedeelt',
				third: 'bedeelt'
			}
		},
		past: {
			pl: 'bedeelden',
			sg: 'bedeelde'
		},
		perfect: 'bedeeld'
	},
	{
		input: 'halen',
		present: {
			pl: 'halen',
			sg: {
				first: 'haal',
				second: 'haalt',
				third: 'haalt'
			}
		},
		past: {
			pl: 'haalden',
			sg: 'haalde'
		},
		perfect: 'gehaald'
	},
	{
		input: 'voelen',
		present: {
			pl: 'voelen',
			sg: {
				first: 'voel',
				second: 'voelt',
				third: 'voelt'
			}
		},
		past: {
			pl: 'voelden',
			sg: 'voelde'
		},
		perfect: 'gevoeld'
	},
	{
		input: 'openen',
		present: {
			pl: 'openen',
			sg: {
				first: 'open',
				second: 'opent',
				third: 'opent'
			}
		},
		past: {
			pl: 'openden',
			sg: 'opende'
		},
		perfect: 'geopend'
	},
	{
		input: 'regenen',
		present: {
			pl: 'regenen',
			sg: {
				first: 'regen',
				second: 'regent',
				third: 'regent'
			}
		},
		past: {
			pl: 'regenden',
			sg: 'regende'
		},
		perfect: 'geregend'
	},
	{
		input: 'be-kennen',
		present: {
			pl: 'bekennen',
			sg: {
				first: 'beken',
				second: 'bekent',
				third: 'bekent'
			}
		},
		past: {
			pl: 'bekenden',
			sg: 'bekende'
		},
		perfect: 'bekend'
	},
	{
		input: 'beteren',
		present: {
			pl: 'beteren',
			sg: {
				first: 'beter',
				second: 'betert',
				third: 'betert'
			}
		},
		past: {
			pl: 'beterden',
			sg: 'beterde'
		},
		perfect: 'gebeterd'
	},
	{
		input: 'menen',
		present: {
			pl: 'menen',
			sg: {
				first: 'meen',
				second: 'meent',
				third: 'meent'
			}
		},
		past: {
			pl: 'meenden',
			sg: 'meende'
		},
		perfect: 'gemeend'
	},
	{
		input: 'ver-gaderen',
		present: {
			pl: 'vergaderen',
			sg: {
				first: 'vergader',
				second: 'vergadert',
				third: 'vergadert'
			}
		},
		past: {
			pl: 'vergaderden',
			sg: 'vergaderde'
		},
		perfect: 'vergaderd'
	},
	{
		input: 'oefenen',
		present: {
			pl: 'oefenen',
			sg: {
				first: 'oefen',
				second: 'oefent',
				third: 'oefent'
			}
		},
		past: {
			pl: 'oefenden',
			sg: 'oefende'
		},
		perfect: 'geoefend'
	},
	{
		input: 'uiten',
		present: {
			pl: 'uiten',
			sg: {
				first: 'uit',
				second: 'uit',
				third: 'uit'
			}
		},
		past: {
			pl: 'uitten',
			sg: 'uitte'
		},
		perfect: 'geuit'
	},
	{
		input: 'wandelen',
		present: {
			pl: 'wandelen',
			sg: {
				first: 'wandel',
				second: 'wandelt',
				third: 'wandelt'
			}
		},
		past: {
			pl: 'wandelden',
			sg: 'wandelde'
		},
		perfect: 'gewandeld'
	},
	{
		input: 'ver-delen',
		present: {
			pl: 'verdelen',
			sg: {
				first: 'verdeel',
				second: 'verdeelt',
				third: 'verdeelt'
			}
		},
		past: {
			pl: 'verdeelden',
			sg: 'verdeelde'
		},
		perfect: 'verdeeld'
	},
	{
		input: 'ge-loven',
		present: {
			pl: 'geloven',
			sg: {
				first: 'geloof',
				second: 'gelooft',
				third: 'gelooft'
			}
		},
		past: {
			pl: 'geloofden',
			sg: 'geloofde'
		},
		perfect: 'geloofd'
	},
	{
		input: 'ver-liezen~ver-loren||verloren',
		present: {
			pl: 'verliezen',
			sg: {
				first: 'verlies',
				second: 'verliest',
				third: 'verliest'
			}
		},
		past: {
			pl: 'verloren',
			sg: 'verloor'
		},
		perfect: 'verloren'
	}
];

// Interesting cases: zien, doen, gaan, kunnen

cases.forEach(c => test(`conjugation of '${c.infinitive}'`, testConjugation, c));
