$(document).ready(function(){
	$('.nav-menu').click(function(){
		$('.nav-links').toggleClass('expand');
	})

	$('#service-dropdown .dropdown-arrow').click(function(){
		$('#service-dropdown.nav-item').toggleClass('expand');
	})

	$(window).resize(function(){
		if ($(window).width() > 767) {
			$('.nav-links').removeClass('expand');
			$('#service-dropdown.nav-item').removeClass('expand');
		}
	})

})