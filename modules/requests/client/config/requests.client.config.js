'use strict';

// Configuring the Records module
angular.module('requests').run(['Menus',
  function (Menus) {
    // Add the records dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Requests',
      state: 'requests.list'
    });




  }
]);
