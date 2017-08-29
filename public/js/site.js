$(document).ready(function(){


	$('.nav-menu').click(() => {
		$('.nav-links').toggleClass('expand');
	})

	$('#service-dropdown').click(function(){
		$('#service-dropdown.nav-item').toggleClass('expand');
	})

	$(window).resize(() => {
		if ($(window).width() > 767) {
			$('.expand').removeClass('expand');
		}
	})

	

})