var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Employee Model
 * ==========
 */

var Employee = new keystone.List('Employee', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Employee.add({
	name: { type: String, required: true },
	jobTitle: { type: String },
	certifications: { type: String },
	bio: { type: String },
	executive: {type: Boolean},
	image: { type: Types.CloudinaryImage },
});

Employee.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Employee.register();