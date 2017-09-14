$(document).ready(() => {
	if(document.cookie.split(';').indexOf(' completedGate=true') >= 0 || document.cookie.split(';').indexOf('completedGate=true') >= 0) {
		$('.gate-cover').remove();
	} else {
		$('.gate-cover').addClass('visible');
	}

	$('#gateForm').submit( () => {
		let date = new Date();
		date.setMonth(date.getMonth() + 12);
		document.cookie = "completedGate=true;expires=" + date + ";domain=dmg-website.herokuapp.com;path=/";
		return true;
	});
})