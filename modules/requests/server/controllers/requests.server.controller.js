'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
    var bot = require('../../../records/server/controllers/bot.server.controller');
/**
 * List of Requests per day
 */
exports.list = function (req, res) {

    Request.aggregate([{
            $group: {
                _id: { year: { $year : '$date' }, month: { $month : '$date' },day: { $dayOfMonth : '$date' }},
                total: {$sum: '$count'}}
        }])
        .exec(function (err, requests) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(requests);
        }
    });
};

exports.doRequest = function (req, res) {

    bot.start();

    res.json({
        success: true,
        message: "Bot Started"
    });
};
