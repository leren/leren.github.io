let conj = (pattern) => {
	let groups = /^([a-z-]+)(?:~([a-z-]+))?(?:\|([a-z,]+)?(?:~([a-z]+))?)?(?:\|([a-z]+))?$/.exec(pattern);
	let infinitivePattern = groups[1];
	let infinitive = infinitivePattern.replace('-', '');
	let infinitivePastPattern = groups[2];
	let { stem, ending } = makeStem(infinitivePattern);
	let first, second, third;
	
	if (groups[3]) {
		let parts = groups[3].split(',');

		first = parts[0];
		second = parts[1],
		third = parts[2];
	}

	let stemPast = groups[4] || (stem + ending + 'e');
	let infinitivePast = stemPast + 'n';

	if (infinitivePastPattern) {
		infinitivePast = infinitivePastPattern.replace('-', '');

		if (!groups[4]) {
			let pastData = makeStem(infinitivePastPattern);

			stemPast = pastData.stem;
			ending = pastData.ending;
		}
	}

	let perfect;

	// Single syllable
	if (soundsLike(infinitive, '^x+o+n$')) {
		perfect = 'ge' + infinitive;
	} else {
		perfect = ((/^(be-|ge-|ver-)/.test(pattern) ? '' : 'ge') + ((groups[2] || groups[4]) ? stemPast : stem) + ending);

		// Remove double dd and tt
		perfect = perfect.replace(/([dt])\1$/, '$1');
	}

	perfect = groups[5] || perfect;

	return {
		present: {
			pl: infinitive,
			sg: {
				first: first || stem,
				second: second || (stem.replace(/([ao])$/, '$1$1') + 't').replace(/tt$/, 't'),
				third: third || (stem.replace(/([ao])$/, '$1$1') + 't').replace(/tt$/, 't')
			}
		},
		past: {
			pl: infinitivePast,
			sg: stemPast
		},
		perfect,
		regular: {
			present: {
				sg: {
					first: !first,
					second: !second,
					third: !third
				},
				pl: true
			},
			past: {
				sg: !groups[2] && !groups[4],
				pl: !groups[2]
			},
			perfect: !groups[2] && !groups[4] && !groups[5]
		}
	};
};

let makeStem = pattern => {
	let stem = pattern.replace(/en$/, '');

	// Single syllable
	if (soundsLike(pattern, '^x+o+n$')) {
		stem = pattern.replace(/n$/, '');
	}

	if (stem[stem.length - 1] === stem[stem.length - 2]) {
		stem = stem.substr(0, stem.length - 1);
	} else if ((soundsLike(stem, '-x+ox$') || soundsLike(stem, '^x*ox$')) && !soundsLike(stem, 'oxox$')) {
		stem = stem.replace(/(.)(.)$/, '$1$1$2');
	}

	// Ending is determined BEFORE replacing some sounded consonants
	// with their unsounded counterpart (e.g. v»f, z»s)
	let ending = isSoundedConsonant(stem[stem.length - 1]) ? 'd' : 't';

	stem = stem
		.replace('-', '') // Remove stress marker
		.replace(/v$/, 'f')
		.replace(/z$/, 's');

	return {
		stem,
		ending
	};
};

let soundedConsonants = 'bdgjlmnqrvwxz';
let unsoundedConsonants = 'fkpstch';
let vowels = 'aeiouy';

let soundsLike = (string, pattern) => {
	pattern = pattern
		.replace(/x/g, `[${soundedConsonants}${unsoundedConsonants}]`)
		.replace(/o/g, `[${vowels}]`);

	return new RegExp(pattern, 'i').test(string);
};

let isSoundedConsonant = c => soundedConsonants.indexOf(c) > -1;

// Are these two obsolete?
let isConsonant = c => soundedConsonants.indexOf(c) > -1 || unsoundedConsonants.indexOf(c) > -1;
let isVowel = c => vowels.indexOf(c) > -1;

if (typeof(module) !== 'undefined') {
	module.exports = conj;
}
