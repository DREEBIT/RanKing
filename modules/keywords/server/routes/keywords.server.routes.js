'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...

	var keywords = require('../controllers/keywords.server.controller');

	app.route('/api/keywords')
		.get(keywords.list)
		.post(keywords.create);

	app.route('/api/keywords/:id')
		.delete(keywords.delete);




};
