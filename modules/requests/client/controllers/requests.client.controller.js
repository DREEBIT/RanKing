'use strict';

// Articles controller
angular.module('requests').controller('RequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Requests',
    function ($scope, $stateParams, $location, Authentication, Requests) {
        $scope.authentication = Authentication;

        $scope.title = 'Requests';

        // Find a list of Keywords
        $scope.find = function () {
            $scope.requests = Requests.query(function(data){
            });
        };
    }
]);
