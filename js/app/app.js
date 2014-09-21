'use strict';

var app = angular.module('CrowdchatApp', [
  'ionic',
  'ngRoute',
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'firebase',
  'CrowdchatApp.filters',
  'CrowdchatApp.services',
  'CrowdchatApp.directives',
  'CrowdchatApp.controllers'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('splash', {
    url: '/', templateUrl: 'templates/splash.html', controller: 'MyController'
  });
  $stateProvider.state('create', {
    url: '/create', templateUrl: 'templates/create.html', controller: 'MyController'
  });
  $stateProvider.state('trending', {
    url: '/trending', templateUrl: 'templates/trending.html', controller: 'MyController'
  });
  $stateProvider.state('chat', {
    url: '/:name', templateUrl: 'templates/crowdchat.html', controller: 'ChatroomController'
  });

  $urlRouterProvider.otherwise("/");

  //$routeProvider.when('/', {templateUrl: 'partials/splash.html', controller: 'MyController'});
  //$routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'MyController'});
  //$routeProvider.when('/trending', {templateUrl: 'partials/trending.html', controller: 'MyController'});
  //$routeProvider.when('/:name', {templateUrl: 'partials/crowdchat.html', controller: 'ChatroomController'});
  //$routeProvider.otherwise({redirectTo: '/'});
});

app.constant('FIREBASE_URL', 'https://crowdchat-test.firebaseio.com/');