$(document).ready( () => {

	var clientQuotes = {
		quotes: [
			{
				quote: "DMG is one of those awesome partnership’s at Danaher. They originally started working in a single BU and then through referrals and significant value added results they have helped many Danaher BUs in recent years. They bring unique experience, a graceful style and a mindset of getting to the right answer. In the DBSO, we view them as part of a very short list of significantly valued partners.",
				clientName: "Mike Weatherred",
				clientCompany: "Vice President"
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

	var pageWidth = pageWidth = $(window).innerWidth();


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
		if (!clientQuotes.paused && $(window).scrollTop() < ($('.team-section').position().top - 100)) {
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


	var teamSection = {
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
		},
		selected: {
			index: null,
			group: null
		}

	};

	setDivders = function(windowWidth) {
		resetDividers();
		$('.divider').removeClass('dividing');
		if (windowWidth > 1200) {
			teamSection.currentDividers = "lg";
		} else if (windowWidth > 991) {
			teamSection.currentDividers = "md";
		} else if (windowWidth > 560) {
			teamSection.currentDividers = "sm";
		} else {
			teamSection.currentDividers ="xs";
		}
		for (let i = 0; i < teamSection.numPeople.exec; i++) {
			if ((i + 1) % teamSection.peoplePerLine[teamSection.currentDividers].exec === 0 || (i + 1) === teamSection.numPeople.exec) {
				$("#exec-divider" + i).addClass('dividing');
			}
		};
		for (let i = 0; i < teamSection.numPeople.team; i++) {
			if ((i + 1) % teamSection.peoplePerLine[teamSection.currentDividers].team === 0 || (i + 1) === teamSection.numPeople.team) {
				$("#team-divider" + i).addClass('dividing');
			}
		};
	};

	$(window).resize((event) => {
		if(event.target.innerWidth !== pageWidth) {
			setDivders(event.target.innerWidth);
			pageWidth = event.target.innerWidth;
		};
	});

	dertermineDivider = function(index, group) {
		for (let i = index; i < teamSection.numPeople[group]; i++) {
			if ((i + 1) % teamSection.peoplePerLine[teamSection.currentDividers][group] === 0 || (i + 1) === teamSection.numPeople[group]) {
				return i;
			}
		}
	};

	resetDividers = function() {
		teamSection.selected = {
			index: null,
			group: null,
		};
		teamSection.openDivider = {
			index: null,
			group: null
		}
		$('.team-member.active').removeClass('active');
		$('.divider.visible').removeClass('visible');
	}



	displayBio = function(bio, certifications, group, index) {
		if (index === teamSection.selected.index && group === teamSection.selected.group) {
			resetDividers();
		} else {
			$('.team-member.active').removeClass('active');
			$("#" + group + index).addClass('active');
			let dividerIndex = dertermineDivider(index, group);
			if (dividerIndex === teamSection.openDivider.index && group === teamSection.openDivider.group) {
				$('#' + group + "-divider" + dividerIndex + " .text").removeClass('visible');
				setTimeout(() => {
					$('#' + group + "-divider" + dividerIndex + " .bioText").html(bio);
					if (certifications != "") {
						$('#' + group + "-divider" + dividerIndex + " .certText").html("<br><strong>Certifications:</strong> " + certifications);
					} else {
						$('#' + group + "-divider" + dividerIndex + " .certText").html("");
					};
					$('#' + group + "-divider" + dividerIndex + " .text").addClass('visible');
				}, 250);
			} else {
				$('.divider.visible').removeClass('visible');
				$('#' + group + "-divider" + dividerIndex).addClass('visible');
				$('#' + group + "-divider" + dividerIndex + " .bioText").html(bio);
				if (certifications != "") {
						$('#' + group + "-divider" + dividerIndex + " .certText").html("<br><strong>Certifications:</strong> " + certifications);
				} else {
					$('#' + group + "-divider" + dividerIndex + " .certText").html("");
				};
				$('#' + group + "-divider" + dividerIndex + " .text").addClass('visible');
			}
			teamSection.openDivider.index = dividerIndex;
			teamSection.openDivider.group = group;
			teamSection.selected.index = index;
			teamSection.selected.group = group;
			$('#' + group + "-divider" + dividerIndex + ".visible").css("max-height", ($('#' + group + "-divider" + dividerIndex + " text").css("height") + 10) + "px");
		}
	};


	setDivders($(window).innerWidth())
})