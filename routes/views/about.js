var keystone = require('keystone');

exports = module.exports = function (req, res) {


	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'about';
	locals.data = {
		executiveTeam: [],
		team: []
	};

	view.on('init', function(next) {
		keystone.list('Employee').model.find({executive: true}).sort('name').exec(function(err,results) {
			if (err || !results.length) {
				console.log(err);
				return next(err);
			} else {
				locals.data.executiveTeam = results;
				next();
			}
		});
	});

	view.on('init', function(next) {
		keystone.list('Employee').model.find({executive: false}).sort('name').exec(function(err,results) {
			if (err || !results.length) {
				return next(err);
			} else {
				locals.data.team = results;
				next();
			}
		});
	});

	// Render the view
	view.render("about-us");
};