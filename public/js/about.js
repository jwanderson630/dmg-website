$(document).ready( () => {

	var clientQuotes = {
		quotes: [
			{
				quote: "DMG is one of those awesome partnership’s at Danaher. They originally started working in a single BU and then through referrals and significant value added results they have helped many Danaher BUs in recent years. They bring unique experience, a graceful style and a mindset of getting to the right answer. In the DBSO, we view them as part of a very short list of significantly valued partners.",
				clientName: "Mike Weatherred",
				clientCompany: "Vice President, Danaher"
			},
			{
				quote: "Dunthorpe is a solid partner that does quality work for Fortive. They are critical thinkers and problem solvers, always seeking the best solution for every challenge and opportunity. And they’ve never let us down.",
				clientName: "Kirsten Paust",
				clientCompany: "FBSO"
			},
			{
				quote: "We’ve worked closely with Dunthorpe Marketing over an extended period of time to solve marketing problems. They offer a full range of services, aren’t afraid to roll up their sleeves, and have taken the time to understand what’s truly important to our business and the way we work. I trust them to fully deliver on their commitments to the business.",
				clientName: "Sue Dancer",
				clientCompany: "Senior Marketing Manager"
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
			const newQuote = clientQuotes.currentQuote + 1 > (clientQuotes.quotes.length - 1) ? 0 : clientQuotes.currentQuote + 1; 
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
		console.log(clientQuotes.quotes.length, clientQuotes.currentQuote);
		let newQuote = clientQuotes.currentQuote + change;
		if (newQuote > (clientQuotes.quotes.length - 1)) {
			newQuote = 0;
		} else if (newQuote < 0) {
			newQuote = (clientQuotes.quotes.length - 1);
		}
		changeQuote(newQuote, 200);
	};

	setInterval(cycleQuotes, 4000);


	var teamSection = {
		peoplePerLine: {
			lg: 4,
			md: 3,
			sm: 2,
			xs: 1
		},
		currentDividers: "",
		numPeople: [
			{
				name: 'executive',
				count: $('.executive-divider').length
			},
			{
				name: 'account',
				count: $('.account-divider').length
			},
			{
				name: 'technical',
				count: $('.technical-divider').length
			},
			{
				name: 'teleservices',
				count: $('.teleservices-divider').length
			}
		],
		openDivider: {
			index: null,
			group: null,
		},
		selected: {
			index: null,
			group: null
		},
		groupIndex: {
			"executive": 0,
			"account": 1,
			"technical": 2,
			"teleservices": 3
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
		for (var y = 0; y < teamSection.numPeople.length; y++) {
			for (let i = 0; i < teamSection.numPeople[y].count; i++) {
				if ((i + 1) % teamSection.peoplePerLine[teamSection.currentDividers] === 0 || (i + 1) === teamSection.numPeople[y].count) {
						$("#" + teamSection.numPeople[y].name + "-divider" + i).addClass('dividing');
				}
			}
		}
		
	};

	$(window).resize((event) => {
		if(event.target.innerWidth !== pageWidth) {
			setDivders(event.target.innerWidth);
			pageWidth = event.target.innerWidth;
		} 
	});

	dertermineDivider = function(index, group) {
		for (let i = index; i < teamSection.numPeople[teamSection.groupIndex[group]].count; i++) {
			if ((i + 1) % teamSection.peoplePerLine[teamSection.currentDividers] === 0 || (i + 1) === teamSection.numPeople[teamSection.groupIndex[group]].count) {
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
		};
		$('.team-member.active').removeClass('active');
		$('.divider.visible').removeClass('visible');
	};



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
					}
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
				}
				$('#' + group + "-divider" + dividerIndex + " .text").addClass('visible');
			}
			teamSection.openDivider.index = dividerIndex;
			teamSection.openDivider.group = group;
			teamSection.selected.index = index;
			teamSection.selected.group = group;
			$('#' + group + "-divider" + dividerIndex + ".visible").css("max-height", ($('#' + group + "-divider" + dividerIndex + " text").css("height") + 10) + "px");
		}
	};


	

	setDivders($(window).innerWidth());
});