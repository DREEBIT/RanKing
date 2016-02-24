'use strict';

//Setting up route
angular.module('proxies').config(['$stateProvider',
    function($stateProvider) {

        // Proxies state routing
        $stateProvider
            .state('proxies', {
                abstract: true,
                url: '/proxies',
                template: '<ui-view/>',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('proxies.list', {
                url: '',
                templateUrl: 'modules/proxies/views/proxies.client.view.html'
            })
            .state('proxies.detail', {
                url: '/:id',
                templateUrl: 'modules/proxies/views/proxy.client.view.html'
            });
    }
]);
