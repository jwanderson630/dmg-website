var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'resources';
	locals.filters = {
		post: req.params.article,
	};
	locals.data = {
		posts: [],
	};
	locals.gate = true;

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			if (result === null) {
				return res.status('404').redirect('/resources');
			} else if (result.gated === false) {
				locals.gate = false;
				next(err);
			}	
		});


	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find({state: 'published', "_id": {"$ne": locals.data.post._id}}).populate('categories').sort('-publishedDate').limit(3);
		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});


	view.on('post', { action: 'gate' }, function (next) {
		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'firstName, lastName, email, phone, company',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else { 
				locals.gate = false;
			}
			next();
		});
	});

	// Render the view
	if (locals.data.post === null) {
		view.render('resources');
	}
	view.render('article');
};
