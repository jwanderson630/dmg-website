var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var nodemailer = require('nodemailer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	const transporter = nodemailer.createTransport({
		host: 'in-v3.mailjet.com',
		port: 587,
		secure: false,
		auth: {
			user: 'e7793244bd880bdb4c02d5d47710f2d3',
			pass: 'a7a2f167c4c38a2542da53ea1e697ae4'
		}
	});

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
			} else {
				next();
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
		const mailOptions = {
			from: '<janderson@dunthorpemarketing.com>',
			to: 'jwdunthorpe@gmail.com',
			html: 
				`
					<h1>Website form submission</h1>
					<br>
					<p>
						From: ${req.body.firstName} ${req.body.lastName}<br>
						Email: ${req.body.email}<br>
						Company: ${req.body.company}<br>
						Phone: ${req.body.phone}<br>
						Message: ${req.body.message}<br>
						Source: ${req.body.source}
					</p>
				`,
			text: "Website form submission \n From: " + req.body.firstName + " " + req.body.lastName + "\nEmail: " + req.body.email + "\nCompany: " + req.body.company + "\nPhone: " + req.body.phone + "\nTitle: " + req.body.jobTitle + "\nMessage: " + req.body.message + "\nSource: " + req.body.source
		};
		transporter.sendMail(mailOptions, (error,info) => {
			if (error) {
				return console.log(error);
			}
			console.log(info.messageId);
		});

		updater.process(req.body, {
			flashErrors: true,
			fields: 'firstName, lastName, email, phone, company, source',
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
