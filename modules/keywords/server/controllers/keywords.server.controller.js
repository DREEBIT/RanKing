'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Keyword = mongoose.model('Keyword'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Keyword
 */

exports.create = function (req, res) {

    if (req.param("insert")=="multiple"){

        Keyword.collection.insert(req.body,function (err, keywords) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json({success: true, data: keywords});
            }
        });

    }else {
        var keyword = new Keyword(req.body);

        keyword.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(keyword);
            }
        });
    }

};

/**
 * Create multiple Keywords
 * Request body must be an array
 */

exports.delete = function (req, res) {

    var id = req.params.id;
    Keyword.remove({ _id: id }, function(err, result) {
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
 * List of Records
 */
exports.list = function (req, res) {

    Keyword.find({}, function(err, result) {
        if (!err){
            res.json(result);
        } else {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    }).sort({
        title: 1
    });

};
