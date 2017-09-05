$(document).ready( () => {

	$('#filter-dropdown').click( () => {
		$('.filter-dropdown').toggleClass('expand');
	});
	$('.filter-dropdown').mouseleave(() => {
		$('.filter-dropdown').removeClass('expand');
	})
})