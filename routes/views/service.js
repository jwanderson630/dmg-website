var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		category: '',
		posts: []
	};

	view.on('init', function (next) {

		keystone.list('PostCategory').model.findOne({key: req.params.service}).exec( function(err, results) {
			if (err) {
				return next(err);
			} else {
				locals.data.category = results.id;
				next();
			}
	
		});
	});

	view.on('init', function(next) {
		keystone.list('Post').model.find().sort('-publishedDate').populate('categories').limit(3).where('categories').in([locals.data.category]).exec(function (err, results) {

			if (err || !results.length) {
				console.log('error');
				return next(err);
			}
			else {
				locals.data.posts = results;
				next();
			};
		});
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'services';

	// Render the view
	view.render(req.params.service);
};