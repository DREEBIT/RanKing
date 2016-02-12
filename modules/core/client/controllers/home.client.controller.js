'use strict';

angular.module('core').controller('HomeController', ['$scope',
    function ($scope) {

        $scope.title = 'RanKing';

        $scope.description = 'A tool, for analysing google search ranking';
    }
]);
