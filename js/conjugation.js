let conj = (pattern) => {
	let groups = /^([a-z-]+)(?:~([a-z-]+))?(?:\|([a-z,]+)?(?:~([a-z]+))?)?(?:\|([a-z]+))?$/.exec(pattern);
	let infinitivePattern = groups[1];
	let infinitive = infinitivePattern.replace('-', '');
	let infinitivePastPattern = groups[2];
	let { stem, ending } = makeStem(infinitivePattern);

	if (groups[3]) {
		let parts = groups[3].split(',');
		stem = parts[0];
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

	let perfect = groups[5] || ((/^(be-|ge-|ver-)/.test(pattern) ? '' : 'ge') + stem + ending);

	// Remove double tt
	perfect = perfect.replace(/tt$/, 't');

	return {
		infinitive,
		infinitivePast,
		stem,
		stemPast,
		perfect
	};
};

let makeStem = pattern => {
	let stem = pattern.replace(/en$/, '');

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
