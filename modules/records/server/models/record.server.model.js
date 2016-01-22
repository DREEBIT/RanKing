'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RecordSchema = new Schema({
  date: {
    type: Date
  },
  keyword: {
    type: String
  },
  rank: {
    type: Number
  },
  link: {
    type: String
  }
});

mongoose.model('Record', RecordSchema);
