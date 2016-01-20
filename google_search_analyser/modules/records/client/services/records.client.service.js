'use strict';

//Records service used for communicating with the records REST endpoints
angular.module('records').factory('Records', ['$resource',
  function ($resource) {
    return $resource('api/records/:keyword', {
      keyword: '@keyword'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
