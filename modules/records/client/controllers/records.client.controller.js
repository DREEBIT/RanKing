'use strict';

// Articles controller
angular.module('records').controller('RecordsController', ['$scope', '$stateParams', '$location', 'Authentication', '$filter', 'Records',
    function ($scope, $stateParams, $location, Authentication, $filter, Records) {
        $scope.authentication = Authentication;

        $scope.title = 'Results';

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
                    scaleOverride : true,
                    bezierCurve: true,
                    scaleSteps : 5,
                    scaleStepWidth : 8,
                    scaleStartValue : 1,
                    datasetFill : false
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
                            if (record.date.indexOf(label) > -1 && $scope.chart.data[seriesIndex][labelIndex] === null) {
                                $scope.chart.data[seriesIndex][labelIndex] = record.rank;
                            }
                        });
                    }
                });
            });
            $scope.chart.labels.forEach(function(label, labelIndex){
                $scope.chart.labels[labelIndex] = $filter('date')(label,'dd.MM.yyyy');
            });
        };

        // Find a list of Keywords
        $scope.find = function () {
            $scope.keywords = Records.query();
        };


        // Find existing Records for Keyword
        $scope.findRecordsForKeyword = function () {
            $scope.records = Records.query({
                keyword: $stateParams.keyword
            }, function(){

                $scope.populateChartData();
            });
        };

        $scope.fill = function(record, seriesIndex){
            $scope.chart.labels.forEach(function(label, labelIndex){
                if (record.date.indexOf(label) > -1) {
                    $scope.chart.data[seriesIndex][labelIndex] = record.rank;
                }
            });
        };
    }
]);
