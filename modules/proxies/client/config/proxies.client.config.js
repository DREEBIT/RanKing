'use strict';

// Keywords module config
angular.module('proxies').run(['Menus',
	function (Menus) {
		Menus.addMenuItem('topbar', {
			title: 'Proxy',
			state: 'proxies.list'
		});
	}
]);
