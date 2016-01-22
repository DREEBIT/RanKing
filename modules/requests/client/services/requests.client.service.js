'use strict';

//Records service used for communicating with the records REST endpoints
angular.module('requests').factory('Requests', ['$resource',
  function ($resource) {
    return $resource('api/requests/:id', {
      _id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
