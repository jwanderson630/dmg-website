$(document).ready( () => {

	var clientQuotes = {
		quotes: [
			{
				quote: "Quote 1",
				clientName: "Jane Smith",
				clientCompany: "TestCo Inc."
			},
			{
				quote: "Quote 2",
				clientName: "No Name",
				clientCompany: "TestCo Inc."
			},
			{
				quote: "Quote 3",
				clientName: "Sample Person",
				clientCompany: "TestCo Inc."
			},
			{
				quote: "Quote 4",
				clientName: "Doesn't Exist",
				clientCompany: "TestCo Inc."
			},
			{
				quote: "Quote 5",
				clientName: "Test Test",
				clientCompany: "TestCo Inc."
			},
			{
				quote: "Quote 6",
				clientName: "Human Person",
				clientCompany: "TestCo Inc."
			}
		],
		currentQuote: 0,
		paused: false,
	};


	changeQuote = function(changeTo, timeout) {
		$('.quote, .client-info').addClass('hidden');
		$('.dot').removeClass('active');
		setTimeout(() => {
			$('.quoteText').html(clientQuotes.quotes[changeTo].quote);
			$('#client-name').html(clientQuotes.quotes[changeTo].clientName);
			$('#client-company').html(clientQuotes.quotes[changeTo].clientCompany);
			$('.quote, .client-info').removeClass('hidden');
			$('#dot' + changeTo).addClass('active');
			clientQuotes.currentQuote = changeTo;
		}, timeout);
	};

	cycleQuotes = function() {
		if (!clientQuotes.paused) {
			const newQuote = clientQuotes.currentQuote + 1 > 4 ? 0 : clientQuotes.currentQuote + 1; 
			changeQuote(newQuote, 500);
		};
	};

	$(".quote-container").mouseenter(() => {
		clientQuotes.paused = true;
		$('.quote').removeClass('hidden');
	})

	$('.quote-container').mouseleave(() => {
		clientQuotes.paused = false;
	})

	controlClick = function(change) {
		let newQuote = clientQuotes.currentQuote + change;
		if (newQuote > 4) {
			newQuote = 0;
		} else if (newQuote < 0) {
			newQuote = 4;
		}
		changeQuote(newQuote, 200);
	};

	setInterval(cycleQuotes, 4000)


	var dividers = {
		peoplePerLine: {
			lg: {
				exec: 3,
				team: 4,
			},
			md: {
				exec: 3,
				team: 3,
			},
			sm: {
				exec: 2,
				team: 2,
			},
			xs: {
				exec: 1,
				team: 1
			}
		},
		currentDividers: "",
		numPeople: {
			exec: $('.exec-divider').length,
			team: $('.team-divider').length,
		},
		openDivider: {
			index: null,
			group: null,
		}

	};

	setDivders = function(windowWidth) {
		$('.team-member.active').removeClass('active');
		$('.divider').removeClass('visible');
		$('.divider').removeClass('dividing');
		if (windowWidth > 1200) {
			dividers.currentDividers = "lg";
		} else if (windowWidth > 991) {
			dividers.currentDividers = "md";
		} else if (windowWidth > 560) {
			dividers.currentDividers = "sm";
		} else {
			dividers.currentDividers ="xs";
		}
		for (let i = 0; i < dividers.numPeople.exec; i++) {
			if ((i + 1) % dividers.peoplePerLine[dividers.currentDividers].exec === 0 || (i + 1) === dividers.numPeople.exec) {
				$("#exec-divider" + i).addClass('dividing');
			}
		};
		for (let i = 0; i < dividers.numPeople.team; i++) {
			if ((i + 1) % dividers.peoplePerLine[dividers.currentDividers].team === 0 || (i + 1) === dividers.numPeople.team) {
				$("#team-divider" + i).addClass('dividing');
			}
		};
	};

	$(window).resize((event) => {
		setDivders(event.target.innerWidth);
	});

	dertermineDivider = function(index, group) {
		for (let i = index; i < dividers.numPeople[group]; i++) {
			if ((i + 1) % dividers.peoplePerLine[dividers.currentDividers][group] === 0 || (i + 1) === dividers.numPeople[group]) {
				return i;
			}
		}
	};



	displayBio = function(bio, certifications, group, index) {
		$('.team-member.active').removeClass('active');
		$("#" + group + index).addClass('active');
		let dividerIndex = dertermineDivider(index, group);
		if (dividerIndex === dividers.openDivider.index && group === dividers.openDivider.group) {
			$('#' + group + "-divider" + dividerIndex + " .text").removeClass('visible');
			setTimeout(() => {
				$('#' + group + "-divider" + dividerIndex + " .text").html(bio);
				$('#' + group + "-divider" + dividerIndex + " .text").addClass('visible');
			}, 250);
		} else {
			$('.divider.visible').removeClass('visible');
			$('#' + group + "-divider" + dividerIndex).addClass('visible');
			$('#' + group + "-divider" + dividerIndex + " .text").html(bio).addClass('visible');
		}
		dividers.openDivider.index = dividerIndex;
		dividers.openDivider.group = group;
		$('#' + group + "-divider" + dividerIndex + ".visible").css("max-height", ($('#' + group + "-divider" + dividerIndex + " .text").css("height") + 10) + "px");
		console.log($('#' + group + "-divider" + dividerIndex + " .text").css("height"));
	};

	setDivders($(window).innerWidth())
})