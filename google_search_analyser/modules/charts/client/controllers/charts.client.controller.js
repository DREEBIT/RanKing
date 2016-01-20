'use strict';

// Articles controller
angular.module('charts').controller('ChartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Records',
    function ($scope, $stateParams, $location, Authentication, Records) {
        $scope.authentication = Authentication;

        $scope.title = 'Charts';

        $scope.labels = ['2016-01-14', '2016-01-16', '2016-01-18'];

        $scope.series = ['vsm-cloud.com', 'dreebit-service.eu', 'dreebit.com'];


        $scope.data = [
            [7, 6, 6],
            [9, 9, 9],
            [3, 3, 3]
        ];

        // Create new Article
        $scope.create = function () {
            // Create new Article object
            var record = new Records({
                title: this.title,
                content: this.content
            });

            // Redirect after save
            record.$save(function (response) {
                $location.path('records/' + response._id);

                // Clear form fields
                $scope.title = '';
                $scope.content = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Article
        $scope.remove = function (record) {
            if (record) {
                record.$remove();

                for (var i in $scope.records) {
                    if ($scope.records[i] === record) {
                        $scope.records.splice(i, 1);
                    }
                }
            } else {
                $scope.record.$remove(function () {
                    $location.path('records');
                });
            }
        };

        // Update existing Article
        $scope.update = function () {
            var record = $scope.record;

            record.$update(function () {
                $location.path('records/' + record._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.records = Records.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.record = Records.get({
                recordId: $stateParams.recordId
            });
        };
    }
]);
