'use strict';

angular.module('proxies').controller('ProxiesController', function ($scope, Proxies, toastr) {

	// Controller Logic
	// ...
	$scope.list = Proxies.query();
	$scope.newItem = {};
	$scope.newItemList = {};

	$scope.addSingleFields = [
		{
			"key": "protocol",
			"type": "select",
			"defaultValue": "http",
			"templateOptions": {
				required: true,
				"label": "Protocol",
				"options": [
					{
						"name": "HTTP",
						"value": "http"
					},
					{
						"name": "HTTPS",
						"value": "https"
					}
				]
			}
		},
		{
			key: 'host',
			type: 'input',
			templateOptions: {
				required: true,
				label: 'Host'
			},
			validators: {
				ipAddress: {
					expression: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return /(\d{1,3}\.){3}\d{1,3}/.test(value);
					},
					message: '$viewValue + " is not a valid IP Address"'
				},
				notLocalHost: '$viewValue !== "127.0.0.1"'
			}
		},
		{
			key: 'port',
			type: 'input',
			defaultValue: 80,
			templateOptions: {
				required: true,
				label: 'Host'
			},
			validators: {
				number: {
					expression: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return /^[0123456789]+$/.test(value);
					},
					message: '$viewValue + " is not a valid number"'
				}
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


		console.log($scope);
		Proxies.save($scope.newItem, function () {
			$scope.list = Proxies.query();
			toastr.success("Created Proxy");
		}, function(response){
			var message = "Something went wrong";
			if (response.data.message){
				message = response.data.message;
			}
			toastr.error(message, 'Error');
		});

	};

	$scope.delete = function(proxy){
		proxy.$remove(function(){
			$scope.list = Proxies.query();
		}, function(response){
			var message = "Something went wrong";
			if (response.data.message){
				message = response.data.message;
			}
			toastr.error(message, 'Error');
		});
	};

	$scope.check = function(proxy){
		proxy.$check(function(response){
			console.log(response);
		}, function(response){
			var message = "Something went wrong";
			if (response.data.message){
				message = response.data.message;
			}
			toastr.error(message, 'Error');
		});
	};

});
