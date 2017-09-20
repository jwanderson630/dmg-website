var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	firstName: { type: Types.Name, required: true },
	lastName: { type: Types.Name, required: true},
	email: { type: Types.Email, required: true },
	phone: { type: String },
	company: {type: String},
	jobTitle: {type: String},
	message: { type: Types.Markdown },
	zip: {type: String},
	source: {type: String},
	createdAt: { type: Date, default: Date.now },
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'firstName, lastName, email, company, source, createdAt';
Enquiry.register();
