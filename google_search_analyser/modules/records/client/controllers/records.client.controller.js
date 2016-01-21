'use strict';

// Articles controller
angular.module('records').controller('RecordsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Records',
    function ($scope, $stateParams, $location, Authentication, Records) {
        $scope.authentication = Authentication;

        $scope.title = 'Records for Keywords';

        $scope.fields = [
            {
                key: 'search',
                type: 'input',
                templateOptions: {
                    label: 'Search'
                }
            }
        ];

        $scope.viewfields = [
            {
                key: 'date',
                type: 'input',
                templateOptions: {
                    label: 'Search'
                }
            }
        ];

        $scope.filteredRecords = [];

        $scope.domainsToFilter = ['dreebit.com', 'dreebit-service.eu', 'vsm-cloud.com'];

        $scope.sort = function(a,b){
            if (a < b)
                return -1;
            else if (a > b)
                return 1;
            else
                return 0;
        };

        $scope.prepareChart = function(){

            $scope.chart = {
                labels: [],
                series: $scope.domainsToFilter,
                data: [],
                options: {
                    bezierCurve: true
                }
            };
            //Get recorded Dates
            $scope.records.forEach(function(record, index, array) {

                if ($scope.chart.labels.indexOf(record.date) < 0)
                    $scope.chart.labels.push(record.date);
            });

            //Sort Dates
            $scope.chart.labels.sort($scope.sort());

            //Prepare Data Array
            for(var i = 0; i < $scope.chart.series.length; i++){
                var dataIndex = [];
                for(var j = 0; j < $scope.chart.labels.length; j++){
                    dataIndex.push(null);
                }
                $scope.chart.data.push(dataIndex);
            }
        };

        //Populate Chart with Ranks from Records
        $scope.populateChartData = function(){
            $scope.prepareChart();

            //iterate through all records
            $scope.records.forEach(function(record) {
                $scope.chart.series.forEach(function(serie, seriesIndex){
                    if (record.link.indexOf(serie) > -1) {
                        $scope.chart.labels.forEach(function(label, labelIndex){
                            if (record.date.indexOf(label) > -1) {
                                $scope.chart.data[seriesIndex][labelIndex] = record.rank;
                            }
                        });
                    }
                });
            });
        };

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
        $scope.findRecordsForKeyword = function () {
            $scope.records = Records.query({
                keyword: $stateParams.keyword
            }, function(){

                $scope.populateChartData();
            });
        };
    }
]);
