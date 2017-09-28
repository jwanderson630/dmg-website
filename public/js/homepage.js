$(document).ready(() => {

	var headerHeight = $('.header-image').height();

	var helpQuestions = {
		questions: [
			{
				text:"transform my marketing operations and processes",
				link: "/service/strategy-and-consulting"
			},
			{
				text:"get more out of my marketing campaigns and content",
				link:"/service/campaigns-and-content"
			},
			{
				text:"optimize my automation tools and programs",
				link: "/service/marketing-automation"
			},
			{
				text:"maximize my data resources",
				link: "/service/data-optimization"
			},
			{
				text:"convert more leads, faster",
				link: "/service/teleservices"
			},
		],
		currentQuestion: 0,
		paused: false,
	};

	changeQuestion = function() {
		if (!helpQuestions.paused) {
			$('.dynamic-text').addClass('hidden');
			setTimeout(() => {
				const nextQuestion = helpQuestions.currentQuestion === 4 ? 0 : helpQuestions.currentQuestion + 1;
				$('.dynamic-text').html(helpQuestions.questions[nextQuestion].text).removeClass('hidden');
				helpQuestions.currentQuestion = nextQuestion;
				setLink();
			}, 500);
		} else {
			$('.dynamic-text').removeClass('hidden');
		}
	};

	capabilityFix = function() {
		var height = "auto";
		if ($(window).innerWidth() > 500) {
			height = 0;
			$('.capability .header').height('auto');
			$('.capability .header').each( function(){
				if ($(this).height() > height) {
					height = $(this).height();
				}
			});
			console.log(height);
			$('.capability .header').height(height);
		} else {
			$('.capability .header').height(height);
		}
		
	};

	headerResize = function() {
		let headerHeight = $('.header-image').height();
		$('.header-content-container').css("height", headerHeight);
	};

	setLink = function() {
		if ($(window).innerWidth() < 768) {
			$('.dynamic-text, .static').removeAttr("href");
		} else {
			$('.dynamic-text, .static').prop("href", helpQuestions.questions[helpQuestions.currentQuestion].link);
		}
	};

	setInterval(changeQuestion, 4000);

	$(window).resize(() => {
		capabilityFix();
		headerResize();
		setLink();
	});

	$(window).scroll(() => {
		$('.animate').each(function() {
			if (($(this).offset().top - $(this).innerHeight() + 150 ) <  ($(window).scrollTop() + $('#header-image').innerHeight())) {
				$(this).addClass('animated');
				$(this).removeClass('animate');
			}
		});
	});

	setLink();
	capabilityFix();
	headerResize();

	$('.dynamic-text').html(helpQuestions[1]);


	$('#services-help-dropdown').mouseenter(() => {
		helpQuestions.paused = true;
	});

	$('#services-help-dropdown-arrow').click(() => {
		if ( $(window).innerWidth() >= 768) {
				$('#services-help-dropdown').toggleClass('expand');
		}
	});

	$('.dropdown-btn').click(() => {
		if ( $(window).innerWidth() < 768) {
			$('#services-help-dropdown').toggleClass('expand');
		}
	});

	$('#services-help-dropdown').mouseleave(() => {
		$('#services-help-dropdown').removeClass('expand');
		helpQuestions.paused = false;
	});



});