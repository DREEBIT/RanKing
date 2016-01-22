'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.title = 'Google Search Analyser';

        $scope.description = 'A tool, for analysing google search ranking';
    }
]);
