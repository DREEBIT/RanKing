'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Keyword Schema
 */
var KeywordSchema = new Schema({
	title: {
		type: String,
		unique: true
	}
});

mongoose.model('Keyword', KeywordSchema);
