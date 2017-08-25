var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		category: '',
		posts: []
	};
	
	locals.section = 'about';

	// Render the view
	view.render("about-us");
};