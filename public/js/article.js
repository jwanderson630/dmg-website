$(document).ready(() => {

		console.log(document.cookie);
		var decodedCookie = decodeURIComponent(document.cookie);
		console.log(decodedCookie);

		$('#gateForm').submit( () => {
			console.log('hello');
			let date = new Date();
			date.setMonth(date.getMonth() + 12);
			document.cookie= "completedGate=true;expires=" + date + ";domain=.example.com;path=/";
			return true;
		});
})