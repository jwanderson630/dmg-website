var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
const nodemailer = require('nodemailer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	var transporter = nodemailer.createTransport({
	    host: 'smtp-mail.outlook.com',
	    secureConnection: false,
	    port: 587,
	    tls: {
	    	ciphers: 'SSLv3'
	    },
		auth: {
			user: 'janderson@dunthorpemarketing.com',
			pass: 'Earth28',
		}
	});

	var mailOptions = {
		from: 'janderson@dunthorpemarketing.com',
		to: 'janderson@dunthorpemarketing.com',
		subject: 'test',
		text: 'test',
	};

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
			if (result.gated === false) {
				locals.gate = false;
			}
			next(err);
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
				console.log(err);
			} else { 
				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('email sent');
					}
				});
				locals.gate = false;
			}
			next();
		});
	});

	// Render the view
	view.render('article');
};
