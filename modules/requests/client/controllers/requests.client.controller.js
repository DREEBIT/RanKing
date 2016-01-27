'use strict';

// Articles controller
angular.module('requests').controller('RequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Requests',
    function ($scope, $stateParams, $location, Authentication, Requests) {

        $scope.authentication = Authentication;

        $scope.title = 'Requests';

        $scope.today = new Date();

        // Find a list of Keywords
        $scope.init = function () {
            $scope.requests = Requests.query();
        };

        $scope.startRequest = function(){
            alert('halle');
        };

        $scope.isToday = function(obj){
            if ((obj.day === $scope.today.getDate()) && (obj.month === $scope.today.getMonth()) || (obj.day === $scope.today.getYear())){
                return true;
            }
        };
    }
]);
