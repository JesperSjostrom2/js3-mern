const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
	courseId: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	students: {
		type: Number,
		required: true
	}
});

const SchoolModel = mongoose.model('School', SchoolSchema);

module.exports = SchoolModel;
