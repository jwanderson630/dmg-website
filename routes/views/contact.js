var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var nodemailer = require('nodemailer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	const transporter = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		secure: false,
		auth: {
			user: 'janderson@dunthorpemarketing.com',
			pass: 'Earth28'
		}
	});



	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.gate = true;


	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);
		const mailOptions = {
			from: '<janderson@dunthorpemarketing.com>',
			to: '<jwdunthorpe@gmail.com',
			text: 'test'
		};
		transporter.sendMail(mailOptions, (error,info) => {
			if (error) {
				return console.log(error);
			}
			console.log(info.messageId);
		});

		updater.process(req.body, {
			flashErrors: true,
			fields: 'firstName, lastName, email, phone, company, zip, jobTitle, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
