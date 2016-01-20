'use strict';

/**
 * Module dependencies.
 */
var recordsPolicy = require('../policies/records.server.policy');
var records = require('../controllers/records.server.controller');

module.exports = function (app) {
    // Records collection routes
    app.route('/api/records').all(recordsPolicy.isAllowed)
        .get(records.list)
        .post(records.create);

    /*// Single keyword routes
    app.route('/api/records/:keyword').all(recordsPolicy.isAllowed)
        .get(records.list);*/

    app.route('/api/records/:keyword').all(recordsPolicy.isAllowed)
        .get(records.listKeywords)
        .post(records.create);

    // Finish by binding the record middleware
    app.param('keyword', records.recordByID);
};
