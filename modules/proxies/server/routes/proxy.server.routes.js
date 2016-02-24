'use strict';

module.exports = function(app) {
	// Routing logic
	// ...

	var proxies = require('../controllers/proxies.server.controller');

	app.route('/api/proxies')
		.get(proxies.list)
		.put(proxies.update)
		.post(proxies.create);

	app.route('/api/proxies/:id')
		.post(proxies.check)
		.delete(proxies.delete);
};
