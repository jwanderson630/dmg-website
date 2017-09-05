var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		posts: []
	};

	view.on('init', function (next) {

		keystone.list('Post').model.find({featured: true, state: 'published'}).sort('-publishedDate').populate('categories').limit(3).exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}
			else {
				locals.data.posts = results;
				console.log(results);
				next();
			};
		});
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('index');
};
