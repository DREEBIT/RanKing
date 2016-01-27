'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RequestSchema = new Schema({
  date: {
    type: Date
  },
  count: {
    type: Number
  }
});

mongoose.model('Request', RequestSchema);
