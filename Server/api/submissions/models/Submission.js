'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SubmissionModel = new Schema({
	project_id: {
		type: String,
		required: true
	},
	team_id: {
		type: String,
		required: true
	},
	thumbnail_id: {
		type: String,
		required: true
	},
	image_urls: {
		type: Array,
		required: true
	},
	repo_url: {
		type: String,
		required: true
	},
	submission_time {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Submission', SubmissionModel, 'submissions');
