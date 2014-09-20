'use strict';

/* Controllers */

var app = angular.module('CrowdchatApp.controllers', []);

app.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){

	$scope.login = function() {
		Auth.login();
	}

}]);

app.controller('MyController', ['$scope', '$location', '$firebase', 'Crowdchat', 'FIREBASE_URL', function($scope, $location, $firebase, Crowdchat, FIREBASE_URL) {

	// store these under service
	var ref = new Firebase(FIREBASE_URL + 'crowdchats');
	$scope.crowdchats = $firebase(ref).$asArray();
	//

	$scope.crowdchat = {
		name: 'yourcrowdchat',
		theme: 'theme-number',
		location: 'address',
		donations: 'false',
		is_private: 'false' 
	}

	$scope.createCrowdchat = function() {
		console.log($scope.crowdchat);

		// call these from service
		$scope.crowdchats.$add($scope.crowdchat);
		$location.path('/' + $scope.crowdchat.name);
		$scope.crowdchat = {
			name: 'yourcrowdchat',
			theme: 'theme-number',
			location: 'address',
			donations: 'false',
			is_private: 'false' 
		}
		//

		/*
		Crowdchat.create($scope.crowdchat).then(function(ref) {
			$location.path('/' + ref.name);
			$scope.crowdchat = {
				name: 'default',
				theme: 'theme-number',
				location: 'address',
				donations: 'false',
				is_private: 'false' 
			}
		});
		*/
	}
}]);

app.controller('ChatroomController', ['$scope', '$routeParams', '$firebase', 'Crowdchat', 'MessagePush', function($scope, $routeParams, $firebase, Crowdchat, MessagePush){
	console.log($routeParams.name);
	var crowdchat = Crowdchat.find($routeParams.name);
	console.log(crowdchat + '1');
	$scope.crowdchats = {
		name: crowdchat
	};

	$scope.user = "Anonymous " + Math.round(Math.random()*21);
	$scope.messages = MessagePush;
	$scope.message = {
		from: $scope.user, 
		content: "",
		crowdchat: $scope.crowdchats.name
	};

	$scope.addMessage = function() {
		console.log($scope.message);
		$scope.messages.$add($scope.message);
		$scope.message = {
			from: $scope.user, 
			content: ""
		};
	}

}]);
