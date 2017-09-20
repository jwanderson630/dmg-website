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
				next();
			}
		});
	});

	view.on('init', function (next) {
		if (locals.data.posts.length < 3) {
			const findMore = 3 - locals.data.posts.length;
			keystone.list('Post').model.find({featured: false, state: 'published'}).sort('-publishedDate').populate('categories').limit(findMore).exec(function (err, results) {
				locals.data.posts = locals.data.posts.concat(results);
				next();
			});
		} else {
			next();
		}
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	
	view.render('index');
};
