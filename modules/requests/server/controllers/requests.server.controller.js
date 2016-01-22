'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a record
 */
exports.create = function (req, res) {
    var record = new Request(req.body);
    record.user = req.user;

    record.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(record);
        }
    });
};

/**
 * Show the current record
 */
exports.read = function (req, res) {
    res.json(req.request);
};

/**
 * Update a record
 */
exports.update = function (req, res) {
    var record = req.request;

    record.title = req.body.title;
    record.content = req.body.content;

    record.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(record);
        }
    });
};

/**
 * Delete an record
 */
exports.delete = function (req, res) {
    var record = req.request;

    record.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(record);
        }
    });
};

/**
 * List of Records
 */
exports.list = function (req, res) {

    Request.find().sort('-created').populate('user', 'displayName').exec(function (err, request) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(request);
        }
    });
};
