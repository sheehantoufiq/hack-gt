'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('CrowdchatApp', [
  'ngRoute',
  'firebase',
  'CrowdchatApp.filters',
  'CrowdchatApp.services',
  'CrowdchatApp.directives',
  'CrowdchatApp.controllers'
]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/splash.html', controller: 'MyController'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'MyController'});
  $routeProvider.when('/trending', {templateUrl: 'partials/trending.html', controller: 'MyController'});
  $routeProvider.when('/:name', {templateUrl: 'partials/crowdchat.html', controller: 'ChatroomController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

app.constant('FIREBASE_URL', 'https://crowdchat-test.firebaseio.com/');