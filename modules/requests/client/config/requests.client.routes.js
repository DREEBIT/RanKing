'use strict';

// Setting up route
angular.module('requests').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('requests', {
        abstract: true,
        url: '/records',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('requests.list', {
        url: '',
        templateUrl: 'modules/requests/views/list-requests.client.view.html'
      });
  }
]);
