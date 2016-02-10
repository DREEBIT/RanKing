'use strict';

angular.module('keywords').controller('KeywordsController', function ($scope, Keywords, toastr) {

        $scope.newKeyword = {};
        $scope.newKeywordList = {};

        $scope.addSingleFields = [
            {
                key: 'title',
                type: 'input',
                templateOptions: {
                    label: 'Add a keyword'
                }
            }
        ];

        $scope.addMultipleFields = [
            {
                key: 'titles',
                type: 'textarea',
                templateOptions: {
                    "placeholder": "Insert a comma seperated list, e.g: My first keyword, another keyword",
                    "label": "Add multiple keywords",
                    "rows": 4,
                    "cols": 15
                }
            }
        ];

        $scope.onCreateSingle = function(){
            Keywords.save($scope.newKeyword, function () {
                $scope.keywords = Keywords.query();
            });
        };

        $scope.onCreateMultiple = function(){

            var res = $scope.newKeywordList.titles.split(",");
            if (res.length > 0){

	            var keywords = [];
	            res.forEach(function(item){
		            keywords.push({title: item.replace(/\n/g,'').trim()});
	            });
                Keywords.insert(keywords, function () {
                    $scope.keywords = Keywords.query();
                }, function(response){

	                console.log(response);
	                var message = "Something went wrong";
	                if (response.data.message){
		                message = response.data.message;
	                }
	                toastr.error(message, 'Error');

                });
            }

        };

		$scope.delete = function(keyword){

			console.log(keyword);
			keyword.$remove(function(){
				$scope.keywords = Keywords.query();
			});

		};

        $scope.serachText = {};
        $scope.searchFields = [
            {
                key: 'search',
                type: 'input',
                templateOptions: {
                    label: 'Search'
                }
            }
        ];

        $scope.keywords = Keywords.query();


    }
);
