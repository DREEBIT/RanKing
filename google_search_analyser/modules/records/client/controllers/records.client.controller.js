'use strict';

// Articles controller
angular.module('records').controller('RecordsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Records',
    function ($scope, $stateParams, $location, Authentication, Records) {
        $scope.authentication = Authentication;

        $scope.title = 'Records for Keywords';

        $scope.fields = [
            {
                key: 'searchText',
                type: 'input',
                templateOptions: {
                    label: 'Search'
                }
            }
        ];

        // Create new Record
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

        // Remove existing Record
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

        // Update existing Record
        $scope.update = function () {
            var record = $scope.record;

            record.$update(function () {
                $location.path('records/' + record._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Keywords
        $scope.find = function () {
            $scope.recordslist = Records.query(function(data){
                data.filter(function(a){
                        if (!this[a.keyword]) {
                            this[a.keyword] = 1;
                            $scope.keywords.push(a.keyword);
                        }
                    },
                    {}
                );
            });
            $scope.keywords= $scope.recordslist.filter(
                function(a){if (!this[a]) {this[a] = 1; return a;}},
                {}
            );
        };

        // Find existing Records for Keyword
        $scope.findOneKeyword = function () {
            $scope.records = Records.query({
                keyword: $stateParams.keyword
            }, function(){
                console.log('findOneKeyword in FE' + $scope.records);
                console.log('findOneKeyword in FE' + $scope.records);

            });
        };
    }
]);
