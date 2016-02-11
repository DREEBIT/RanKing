'use strict';

angular.module('core').controller('HomeController', ['$scope',
    function ($scope) {

        $scope.title = 'Google Search Analyser';

        $scope.description = 'A tool, for analysing google search ranking';
    }
]);
