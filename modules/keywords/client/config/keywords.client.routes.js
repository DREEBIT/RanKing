'use strict';

//Setting up route
angular.module('keywords').config(['$stateProvider',
  function($stateProvider) {
    // Keywords state routing
    $stateProvider
      .state('keywords', {
        url: '/keywords',
        templateUrl: 'modules/keywords/views/keywords.client.view.html'
      });
  }
]);
