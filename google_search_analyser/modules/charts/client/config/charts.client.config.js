'use strict';

// Configuring the Articles module
angular.module('charts').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Charts',
      state: 'charts.list'
    });
  }
]);
