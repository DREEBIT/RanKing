'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Record = mongoose.model('Record'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a record
 */
exports.create = function (req, res) {
    var record = new Record(req.body);
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
    res.json(req.record);
};

/**
 * Update a record
 */
exports.update = function (req, res) {
    var record = req.record;

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
    var record = req.record;

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

    Record.aggregate([{
            $group: {
                _id: '$keyword'
            }}])
        .exec(function (err, keywords) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(keywords);
        }
    });
};
/**
 * List of Records
 */
exports.listKeywords = function (req, res) {

    Record.find({keyword: req.params.keyword}).sort('-created').populate('user', 'displayName').exec(function (err, records) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(records);
        }
    });
};

/**
 * Record middleware
 */
exports.recordByKeyword = function (req, res, next, keyword) {

    Record.find({keyword: keyword}).populate('user', 'displayName').exec(function (err, record) {
        if (err) {
            return next(err);
        } else if (!record) {
            return res.status(404).send({
                message: 'No record with that identifier has been found'
            });
        }
        req.keyword = record[0].keyword;

        next();
    });

};
