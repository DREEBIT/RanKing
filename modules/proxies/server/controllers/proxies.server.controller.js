'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
    _ = require('lodash'),
	Proxy = mongoose.model('Proxy'),
	request = require('request'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
/**
 * Create a 
 */
exports.create = function (req, res) {

	var proxy = new Proxy(req.body);
	proxy.insert = new Date();
	proxy.update = proxy.insert;

	console.log(proxy);
	proxy.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(proxy);
		}
	});

};

/**
 * Show the current 
 */
exports.read = function (req, res) {

};

/**
 * Check if proxy is available
 */
exports.check = function(req, res){


	Proxy.findById(req.params.id, function(err, item){

		if (err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else {
			request({
				'url':'https://google.com',
				'proxy':item.protocol + '://' + item.host + ':' + item.port
			}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.json({success: true});
				}else {
					res.status(400).send({
						message: 'Proxy failed',
						error: error
					});
				}
			})
		}

	});


};

/**
 * Update a 
 */
exports.update = function (req, res) {

};

/**
 * Delete an 
 */
exports.delete = function (req, res) {

	var id = req.params.id;
	Proxy.remove({ _id: id }, function(err, result) {
		if (!err){
			res.json({success: true});
		} else {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});

};

/**
 * List of 
 */
exports.list = function (req, res) {

	Proxy.find({}, function(err, result) {
		if (!err){
			res.json(result);
		} else {
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	}).sort({
		insert: 1
	});

};
