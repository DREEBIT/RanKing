'use strict';

angular.module('keywords').factory('Keywords', ['$resource',
  function ($resource) {
    return $resource('api/keywords/:id', {id: '@id'}, {
      insert: {
        method:'POST',
        url: 'api/keywords?insert=multiple'
      },
      remove: {
        method: 'DELETE',
        params: {
          id:"@_id"
        }
      }
    });
  }
]);
