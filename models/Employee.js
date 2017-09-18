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
	team: { type: Types.Select, options: 'executive, account, technical, teleservices', default: 'draft', index: true },
	image: { type: Types.CloudinaryImage, default: 'http://res.cloudinary.com/djoiybrev/image/upload/c_crop,h_348.56,w_0.73/v1505770600/Profile_avatar_placeholder_large_c7nipa.png' },
});

Employee.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Employee.register();