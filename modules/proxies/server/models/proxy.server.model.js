'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Proxy Schema
 */
var ProxySchema = new Schema({
	protocol: {
		type: String
	},
	host: {
		type: String
	},
	port: {
		type: Number
	},
	active: {
		type: Boolean
	},
	lastCheck: {
		type: Date
	},
	insert: {
		type: Date
	},
	update: {
		type: Date
	},
	lastUsed: {
		type: Date
	}
});

mongoose.model('Proxy', ProxySchema);
