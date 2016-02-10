'use strict';

//Requests service used for communicating with the records REST endpoints
angular.module('requests').factory('Requests', ['$resource',
  function ($resource) {
    return $resource('api/requests', {

    }, {
      fetch: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      }
    });
  }
]);
