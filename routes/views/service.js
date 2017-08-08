var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	console.log(typeof req.params.service);

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'services';

	// Render the view
	view.render(req.params.service);
};