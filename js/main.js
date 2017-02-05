Promise.all([
	fetch("/data/exercises.json").then(response => response.json()),
	fetch("/data/subjects.json").then(response => response.json()),
	fetch("/data/verbs.json").then(response => response.json()),
	fetch("/js/conjugation.js").then(response => response.text())
]).then(values => {
	$('.modal').modal({
		complete: () => createExercise(data)
	});

	let data = {
		exercises: values[0],
		subjects: values[1],
		verbs: values[2]
	};

	let scriptEl = document.createElement("script");

	scriptEl.textContent = values[3];
	document.body.appendChild(scriptEl);

	// Sentence idea: <subject#1> <aux#1:hebben> vandaag <verb#1:werken>

	createExercise(data);
});

let createExercise = data => {
	let exerciseEl = document.querySelector("#exercise");
	let phraseEl = document.querySelector("#phrase");
	let answerEl = document.querySelector("#answer");
	let answerWrongEl = document.querySelector("#answer-wrong");
	let answerCorrectEl = document.querySelector("#answer-correct");
	let answerFeedbackEl = document.querySelector("#answer-feedback");
	let formEl = document.querySelector("form");
	let exercise = data.exercises["1"][Math.floor(Math.random() * data.exercises["1"].length)];
	let phrase = makeRandomSentence(exercise.phrase, data.subjects, data.verbs);
	let answer = makeSentence(exercise.answer, phrase.subjects, phrase.verbs, phrase.variables).sentence;

	formEl.onsubmit = e => {
		e.preventDefault();

		var diff = JsDiff.diffChars(answerEl.value, answer);

		console.log(diff);

		console.log("D: " + diff.filter(d => !d.added).map(d => d.value).join(""));
		console.log("A: " + diff.filter(d => !d.removed).map(d => d.value).join(""));

		if (answerEl.value === answer) {
			answerFeedbackEl.style.transitionDuration = "100ms";
			answerFeedbackEl.style.opacity = 1;

			setTimeout(() => {
				answerFeedbackEl.style.transitionDuration = "400ms";
				answerFeedbackEl.style.opacity = 0;
			}, 1500);
			
			createExercise(data);
		} else {
			answerEl.blur();
			// answerWrongEl.innerText = answerEl.value;
			// answerCorrectEl.innerText = answer;

			answerWrongEl.innerHTML = diff
				.filter(d => !d.added)
				.map(d => d.removed ? `<span class="red lighten-4">${d.value}</span>` : d.value)
				.join("");

			answerCorrectEl.innerHTML = diff
				.filter(d => !d.removed)
				.map(d => d.added ? `<span class="green lighten-4">${d.value}</span>` : d.value)
				.join("");

			$("#results").modal("open");
		}
	};

	phraseEl.innerText = phrase.sentence;
	// phraseEl.innerHTML += `<br>${answer}`;
	exerciseEl.style.display = "inherit";
	answerEl.value = "";
	answerEl.focus();
};

let makeRandomSentence = (grammarSource, subjects, verbs) => {
	let grammar = parseGrammar(grammarSource);
	let sentence = grammar.source;
	let subjectsIndex = Object.keys(subjects);
	let subjectMap = {};
	let verbMap = {};
	let varMap = {};

	grammar.parameters.forEach(function(element) {
		let type = element[1];

		if (type === "subject") {
			let subject;

			if (element[3]) {
				let allowedSubjects = element[3].split("|");
				let allowedSubject = allowedSubjects[Math.floor(Math.random() * allowedSubjects.length)];

				subject = makeSubject(subjects[allowedSubject], ["plural", "diminutive"]);
			} else {
				let key = subjectsIndex[Math.floor(Math.random() * subjectsIndex.length)];
				
				subject = makeSubject(subjects[key], ["plural", "diminutive"]);
			}

			sentence = sentence.replace(element[0], subject.value);
			subjectMap[element[2]] = subject;
		}

		if (type === "verb") {
			let definition;

			if (element[3]) {
				let allowedVerbs = element[3].split("|");
				let allowedVerb = allowedVerbs[Math.floor(Math.random() * allowedVerbs.length)];

				definition = verbs.find(v => v.search(`^${allowedVerb}\\b`) === 0);
			} else {
				definition = verbs[Math.floor(Math.random() * verbs.length)];
			}

			let preferFirst = element.index < grammar.parameters.find(e => e[1] === "subject" && e[2] === element[2]).index;
			let verb = makeVerb(definition, subjectMap[element[2]], preferFirst);

			sentence = sentence.replace(element[0], verb.value);
			verbMap[element[2]] = verb;
		}

		if (type === "var") {
			let variables = element[3].split("|");
			let variable = variables[Math.floor(Math.random() * variables.length)];
			
			sentence = sentence.replace(element[0], variable);
			varMap[element[2]] = variable;
		}
	}, this);

	sentence = sentence[0].toUpperCase() + sentence.substr(1);

	console.log(sentence);

	return {
		sentence,
		subjects: subjectMap,
		verbs: verbMap,
		variables: varMap
	};
};

let makeSentence = (grammarSource, subjects, verbs, variables) => {
	let grammar = parseGrammar(grammarSource);
	let sentence = grammar.source;

	grammar.parameters.forEach(function(element) {
		let type = element[1];

		if (type === "subject") {
			let subject = subjects[element[2]];

			sentence = sentence.replace(element[0], subject.value);
		}

		if (type === "verb") {
			let preferFirst = element.index < grammar.parameters.find(e => e[1] === "subject" && e[2] === element[2]).index;
			let verb = makeVerb(verbs[element[2]], subjects[element[2]], preferFirst);

			sentence = sentence.replace(element[0], verb.value);
		}

		if (type === "var") {
			let variable = variables[element[2]];

			sentence = sentence.replace(element[0], variable);
		}
	}, this);

	sentence = sentence[0].toUpperCase() + sentence.substr(1);
	
	console.log(sentence);

	return {
		sentence,
		subjects,
		verbs
	};
};

let makeSubject = (definition, modifiers = []) => {
	let applicableModifiers = 1;
	let subject = definition.root.singular;
	let isPlural = false;
	let isDiminutive = false;

	// Note, this first modifier has the default flipCoin weight of 1/2.
	// To give later modifiers an equal chance of appearing, each subsequent modifier will have a smaller weight:
	// 1/3 for the third modifier, 1/4 for the fourth modifier, 1/5 for the fifth etc.
	if (definition.root.plural && modifiers.includes("plural") && flipCoin(1 / ++applicableModifiers)) {
		subject = definition.root.plural;
		isPlural = true;
		isDiminutive = false;
	}

	if (definition.diminutive && definition.diminutive.singular && modifiers.includes("diminutive") && flipCoin(1 / ++applicableModifiers)) {
		subject = definition.diminutive.singular;
		isPlural = false;
		isDiminutive = true;
	}

	if (definition.diminutive && definition.diminutive.plural && modifiers.includes("diminutive") && modifiers.includes("plural") && flipCoin(1 / ++applicableModifiers)) {
		subject = definition.diminutive.plural;
		isPlural = true;
		isDiminutive = true;
	}

	if (definition.article) {
		let article = isPlural ? "de"
			: isDiminutive ? "het"
			: definition.article;
			
		subject = `${article} ${subject}`;
	}

	return {
		value: subject,
		isPlural,
		isDiminutive,
		person: definition.person
	};
};

let makeVerb = (definition, subject, preferFirst) => {
	// Technically 2nd person always follows 1st person and is never related to 3rd person (e.g. willen).
	// 2nd = 1st plus 't' when after subject
	// 2nd = 1st when before subject
	let conjugation = definition.conjugation || conj(definition);

	let verb = subject.isPlural ? conjugation.present.pl
		: subject.person === "first" ? conjugation.present.sg.first
		: subject.person === "second" ? 
			(preferFirst ? conjugation.present.sg.first : conjugation.present.sg.second || conjugation.present.sg.third)
		: conjugation.present.sg.third;

	return {
		value: verb,
		conjugation: conjugation
	};
};

let flipCoin = (weight = .5) => Math.random() < weight;

let parseGrammar = source => {
	console.log(source);

	let matchExpr = /<([^#:>]+)(?:#([^:>]+))?(?::([^>]+))?>/g;
	let matches = [];
	let match;

	while ((match = matchExpr.exec(source)) !== null) {
		matches.push(match);
	}

	matches.sort((left, right) => {
		let groupLeft = parseInt(left[2] || "0");
		let groupRight = parseInt(right[2] || "0");

		if (groupLeft === groupRight) {
			return left[1] <= right[1] ? -1 : 1;
		}

		return groupLeft <= groupRight ? -1 : 1;
	});

	return {
		source,
		parameters: matches
	};
};
