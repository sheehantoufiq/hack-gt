'use strict';

/* Filters */

var app = angular.module('CrowdchatApp.filters', []);


app.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);

app.filter('inRoom', ['$routeParams', function($routeParams){
	return function(items) {
		var result = {};
		angular.forEach(items, function(key, value) {
			if(value === $routeParams.name) {
				result[key] = value;
			}
		});
	};
}]);