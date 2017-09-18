var keystone = require('keystone');

exports = module.exports = function (req, res) {


	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'about';
	locals.data = {
		team: {
			executive: [],
			account: [],
			technical: [],
			teleservices: []
		}
	};

	view.on('init', function(next) {
		keystone.list('Employee').model.find({team: 'executive'}).sort('-name').exec(function(err,results) {
			if (err || !results.length) {
				console.log(err);
				return next(err);
			} else {
				locals.data.team.executive = results;
				next();
			}
		});
	});

	view.on('init', function(next) {
		keystone.list('Employee').model.find({team: 'account'}).sort('name').exec(function(err,results) {
			if (err || !results.length) {
				console.log(err);
				return next(err);
			} else {
				locals.data.team.account = results;
				next();
			}
		});
	});

	view.on('init', function(next) {
		keystone.list('Employee').model.find({team: 'technical'}).sort('name').exec(function(err,results) {
			if (err || !results.length) {
				console.log(err);
				return next(err);
			} else {
				locals.data.team.technical = results;
				next();
			}
		});
	});

	view.on('init', function(next) {
		keystone.list('Employee').model.find({team: 'teleservices'}).sort('name').exec(function(err,results) {
			if (err || !results.length) {
				console.log(err);
				return next(err);
			} else {
				locals.data.team.teleservices = results;
				next();
			}
		});
	});

	

	// Render the view
	view.render("about-us");
};