'use strict';

//Setting up route
angular.module('keywords').config(['$stateProvider',
  function($stateProvider) {
    // Keywords state routing


      $stateProvider
          .state('keywords', {
              abstract: true,
              url: '/keywords',
              template: '<ui-view/>',
              data: {
                  roles: ['user', 'admin']
              }
          })
          .state('keywords.list', {
              url: '',
              templateUrl: 'modules/keywords/views/keywords.client.view.html'
          });
  }
]);
