'use strict';

angular.module('proxies').factory('Proxies', [ '$resource',
	function ($resource) {
		// Proxies service logic
		// ...

		// Public API
		return $resource('api/proxies/:id', {id: '@id'}, {
			check: {
				method: 'POST',
				params: {
					id:"@_id"
				}
			},
			remove: {
				method: 'DELETE',
				params: {
					id:"@_id"
				}
			}
		});
	}
]);
