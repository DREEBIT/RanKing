'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Menus',
  function ($scope, $state, Menus) {
    // Expose view variables
    $scope.$state = $state;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
