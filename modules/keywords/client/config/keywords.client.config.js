'use strict';

// Keywords module config
angular.module('keywords').run(['Menus',
	function (Menus) {
		Menus.addMenuItem('topbar', {
			title: 'Keywords',
			state: 'keywords.list'
		});
	}
]);
