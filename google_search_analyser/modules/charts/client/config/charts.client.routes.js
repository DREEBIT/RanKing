'use strict';

// Setting up route
angular.module('charts').config(['$stateProvider',
  function ($stateProvider) {
    // Charts state routing
    $stateProvider
      .state('charts', {
        abstract: true,
        url: '/charts',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('charts.list', {
        url: '',
        templateUrl: 'modules/charts/views/list-charts.client.view.html'
      });
  }
]);
