'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Record = mongoose.model('Record'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of Requests per day
 */
exports.listOrderByDate = function (req, res) {

    Record.aggregate([
        {$group: {date: '$date', total: {$sum: '$amount'}}}
        ]
    ).populate('user', 'displayName').exec(function (err, records) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(records);
        }
    });
};
