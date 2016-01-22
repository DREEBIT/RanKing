'use strict';

// Setting up route
angular.module('records').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('records', {
        abstract: true,
        url: '/records',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('records.list', {
        url: '',
        templateUrl: 'modules/records/views/list-records.client.view.html'
      })
      .state('records.view', {
        url: '/:keyword',
        templateUrl: 'modules/records/views/view-record.client.view.html'
      });
  }
]);
