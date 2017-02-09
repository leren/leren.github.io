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
	t.deepEqual(result.regular, expected.regular);
};

let cases = [
	{
		input: 'zijn~waren|ben,bent,is~was|geweest',
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
		perfect: 'geweest',
		regular: {
			present: {
				sg: {
					first: false,
					second: false,
					third: false
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'hebben~hadden|,,heeft',
		present: {
			pl: 'hebben',
			sg: {
				first: 'heb',
				second: 'hebt',
				third: 'heeft'
			}
		},
		past: {
			pl: 'hadden',
			sg: 'had'
		},
		perfect: 'gehad',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: false
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
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
		perfect: 'gewild',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: false
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gewerkt',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gelopen',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
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
		perfect: 'gegeten',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
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
		perfect: 'gebeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gebedeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'bedeeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gehaald',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gevoeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'geopend',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'geregend',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'bekend',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gebeterd',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gemeend',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'vergaderd',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'geoefend',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'geuit',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'gewandeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'verdeeld',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'geloofd',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: true,
				pl: true
			},
			perfect: true
		}
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
		perfect: 'verloren',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'zien~zagen|~zag',
		present: {
			pl: 'zien',
			sg: {
				first: 'zie',
				second: 'ziet',
				third: 'ziet'
			}
		},
		past: {
			pl: 'zagen',
			sg: 'zag'
		},
		perfect: 'gezien',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'doen~deden||gedaan',
		present: {
			pl: 'doen',
			sg: {
				first: 'doe',
				second: 'doet',
				third: 'doet'
			}
		},
		past: {
			pl: 'deden',
			sg: 'deed'
		},
		perfect: 'gedaan',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'gaan~gingen',
		present: {
			pl: 'gaan',
			sg: {
				first: 'ga',
				second: 'gaat',
				third: 'gaat'
			}
		},
		past: {
			pl: 'gingen',
			sg: 'ging'
		},
		perfect: 'gegaan',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'staan~stonden',
		present: {
			pl: 'staan',
			sg: {
				first: 'sta',
				second: 'staat',
				third: 'staat'
			}
		},
		past: {
			pl: 'stonden',
			sg: 'stond'
		},
		perfect: 'gestaan',
		regular: {
			present: {
				sg: {
					first: true,
					second: true,
					third: true
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	},
	{
		input: 'kunnen~konden|kan,,kan~kon|gekund',
		present: {
			pl: 'kunnen',
			sg: {
				first: 'kan',
				second: 'kunt',
				third: 'kan'
			}
		},
		past: {
			pl: 'konden',
			sg: 'kon'
		},
		perfect: 'gekund',
		regular: {
			present: {
				sg: {
					first: false,
					second: true,
					third: false
				},
				pl: true
			},
			past: {
				sg: false,
				pl: false
			},
			perfect: false
		}
	}
];

cases.forEach(c => test(`conjugation of '${c.present.pl}'`, testConjugation, c));
