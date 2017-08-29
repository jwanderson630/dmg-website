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
		breakpoints: {
			lg: [3,7,11,15,19],
			md: [2,3,6,9,12,15,18,19],
			sm: [2,3,5,7,9,11,13,15,17,19],
			xs: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
		},
		currentDividers: "",
	};

	setDivders = function(windowWidth) {
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
		for (let divider of dividers.breakpoints[dividers.currentDividers]) {
			$("#divider" + divider).addClass('dividing');
		};
	};

	$(window).resize((event) => {
		setDivders(event.target.innerWidth);
	})

	setDivders($(window).innerWidth())
})