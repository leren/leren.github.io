Promise.all([
	fetch("/data/exercises.json").then(response => response.json()),
	fetch("/data/subjects.json").then(response => response.json()),
	fetch("/data/verbs.json").then(response => response.json()),
	fetch("/js/conjugation.js").then(response => response.text())
]).then(values => {
	$('.modal').modal();
	
	$('#results').modal({
		complete: () => createExercise(data)
	});

	let data = {
		exercises: values[0],
		subjects: values[1],
		verbs: values[2]
	};

	let scriptEl = document.createElement("script");

	window.verbs = values[2];
	scriptEl.textContent = values[3];
	document.body.appendChild(scriptEl);

	window.onhashchange = () => createExercise(data);

	// Sentence idea: <subject#1> <aux#1:hebben> vandaag <verb#1:werken>

	createExercise(data);
});

let loaderEl = document.querySelector("#loader");
let displayEls = document.querySelectorAll("*[data-display]");
let markdown = new showdown.Converter()

let createExercise = data => {
	let hashMatch = window.location.hash.match(/^#\/(.+)$/);
	let path = hashMatch && hashMatch[1] && hashMatch[1].replace(/\/$/, '') || "home";
	let mainEl = document.querySelector("main");
	let exerciseEl = document.querySelector("#exercise");
	let phraseEl = document.querySelector("#phrase");
	let answerEl = document.querySelector("#answer");
	let answerWrongEl = document.querySelector("#answer-wrong");
	let answerCorrectEl = document.querySelector("#answer-correct");
	let answerFeedbackEl = document.querySelector("#answer-feedback");
	let formEl = document.querySelector("form");
	let exercise = data.exercises[path];
	let questions = exercise.questions;

	exerciseEl.style.display = questions ? "block" : "none";

	displayEls.forEach(el => {
		let intro = exercise[el.dataset.display];

		el.innerHTML = intro instanceof Array ? markdown.makeHtml(intro.join('')) : intro;
		$(el).find("ul").addClass("collection").find("li").addClass("collection-item");
	});

	$("a[data-verb]").click(showVerb);

	// document.querySelectorAll("a[data-verb]").forEach(el => {
	// 	el.addEventListener("click", showVerb);
	// 	el.addEventListener("touchstart", showVerb);
	// });

	loaderEl.style.display = "none";

	if (!questions) {
		return;
	}

	let question = questions[Math.floor(Math.random() * questions.length)];
	let phrase = makeRandomSentence(question.phrase, data.subjects, data.verbs);
	let answer = makeSentence(question.answer, phrase.subjects, phrase.verbs, phrase.variables).sentence;

	answer = answer[0].toUpperCase() + answer.substring(1);

	formEl.onsubmit = e => {
		e.preventDefault();

		if (answerEl.value.toLowerCase() === answer.toLowerCase()) {
			answerFeedbackEl.style.transitionDuration = "100ms";
			answerFeedbackEl.style.opacity = 1;

			setTimeout(() => {
				answerFeedbackEl.style.transitionDuration = "400ms";
				answerFeedbackEl.style.opacity = 0;
			}, 1500);
			
			createExercise(data);
		} else {
			let diff = JsDiff.diffChars(answerEl.value, answer);

			console.log(diff);

			console.log("D: " + diff.filter(d => !d.added).map(d => d.value).join(""));
			console.log("A: " + diff.filter(d => !d.removed).map(d => d.value).join(""));

			answerEl.blur();

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

	phraseEl.innerHTML = phrase.sentenceHTML;

	$(phraseEl).find("a[data-verb]").click(showVerb);

	// phraseEl.querySelectorAll("a[data-verb]").forEach(el => {
	// 	el.addEventListener("click", showVerb);
	// 	el.addEventListener("touchstart", showVerb);
	// });

	// phraseEl.innerHTML += `<br>${answer}`;
	answerEl.value = "";
	answerEl.focus();
};

let showVerb = e => {
	let infinitive = e.target.dataset.verb;
	let verb = conj(verbs.find(v => v.search(`^${infinitive}\\b`) === 0));

	verb.regularTenses = [];
	verb.irregularTenses = [];

	if (Object.values(verb.regular.present.sg).includes(false)) {
		verb.irregularTenses.push("present");
	} else {
		verb.regularTenses.push("present");
	}

	if (Object.values(verb.regular.past).includes(false)) {
		verb.irregularTenses.push("past");
	} else {
		verb.regularTenses.push("past");
	}

	if (!verb.regular.perfect) {
		verb.irregularTenses.push("perfect");
	} else {
		verb.regularTenses.push("perfect");
	}

	verb.hasRegularTenses = !!verb.regularTenses.length;
	verb.hasIrregularTenses = !!verb.irregularTenses.length;
	verb.regularTenses = verb.hasIrregularTenses ? verb.regularTenses.join(" and ") + " tense" : "all tenses";
	verb.irregularTenses = verb.hasRegularTenses ? verb.irregularTenses.join(" and ") + " tense" : "all tenses";

	let html = Mustache.render(window.templates.verb, verb);
	let modalEl = $($.parseHTML(html, document)).appendTo(document.body);

	modalEl
		.find(".tooltipped")
		.tooltip()
		.end()
		.modal({ complete: () => modalEl.add(modalEl.nextAll(".material-tooltip")).remove() })
		.modal("open");
};

let makeRandomSentence = (grammarSource, subjects, verbs) => {
	let grammar = parseGrammar(grammarSource);
	let sentence = grammar.source;
	let sentenceHTML = grammar.source;
	let subjectsIndex = Object.keys(subjects);
	let subjectMap = {};
	let verbMap = {};
	let varMap = {};

	grammar.parameters.forEach(element => {
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
			sentenceHTML = sentenceHTML.replace(element[0], subject.value);
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
			sentenceHTML = sentenceHTML.replace(element[0], `<a data-verb="${verb.conjugation.present.pl}">${verb.value}</a>`);
			verbMap[element[2]] = verb;
		}

		if (type === "var") {
			let variables = element[3].split("|");
			let variable = variables[Math.floor(Math.random() * variables.length)];
			
			sentence = sentence.replace(element[0], variable);
			sentenceHTML = sentenceHTML.replace(element[0], variable);
			varMap[element[2]] = variable;
		}
	}, this);

	console.log(sentence);

	return {
		sentence,
		sentenceHTML,
		subjects: subjectMap,
		verbs: verbMap,
		variables: varMap
	};
};

let makeSentence = (grammarSource, subjects, verbs, variables) => {
	let grammar = parseGrammar(grammarSource);
	let sentence = grammar.source;
	let sentenceHTML = grammar.source;

	grammar.parameters.forEach(function(element) {
		let type = element[1];

		if (type === "subject") {
			let subject = subjects[element[2]];

			sentence = sentence.replace(element[0], subject.value);
			sentenceHTML = sentenceHTML.replace(element[0], subject.value);
		}

		if (type === "verb") {
			let preferFirst = element.index < grammar.parameters.find(e => e[1] === "subject" && e[2] === element[2]).index;
			let verb = makeVerb(verbs[element[2]], subjects[element[2]], preferFirst);

			sentence = sentence.replace(element[0], verb.value);
			sentenceHTML = sentenceHTML.replace(element[0], `<a data-verb="${verb.conjugation.present.pl}">${verb.value}</a>`);
		}

		if (type === "var") {
			let variable = variables[element[2]];

			sentence = sentence.replace(element[0], variable);
			sentenceHTML = sentenceHTML.replace(element[0], variable);
		}
	}, this);
	
	console.log(sentence);

	return {
		sentence,
		sentenceHTML,
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
