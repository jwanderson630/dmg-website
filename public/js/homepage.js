$(document).ready(() => {
	var helpQuestions = {
		questions: [
			"transform my marketing operations and processes",
			"need to get more out of my marketing campaigns and content",
			"need to optimize my automation tools and programs",
			"need to maximize my data resources",
			"need to convert more leads, faster",
		],
		currentQuestion: 0,
		paused: false,
	};

	changeQuestion = function() {
		if (!helpQuestions.paused) {
		$('.dynamic-text').addClass('hidden');
		setTimeout(() => {
			const nextQuestion = helpQuestions.currentQuestion === 4 ? 0 : helpQuestions.currentQuestion + 1;
			$('.dynamic-text').html(helpQuestions.questions[nextQuestion]).removeClass('hidden');
			helpQuestions.currentQuestion = nextQuestion;
		}, 500);
		} else {
			$('.dynamic-text').removeClass('hidden');
		}
	}

	setInterval(changeQuestion, 4000)

	$('.dynamic-text').html(helpQuestions[1]);


	$('#services-help-dropdown').mouseenter(() => {
		helpQuestions.paused = true;
	})

	$('#services-help-dropdown').click(() => {
		$('#services-help-dropdown').toggleClass('expand');
	})

	$('#services-help-dropdown').mouseleave(() => {
		$('#services-help-dropdown').removeClass('expand');
		helpQuestions.paused = false;
	})

})