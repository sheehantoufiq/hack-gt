'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var app = angular.module('CrowdchatApp.services', []);

app.value('version', '0.1');


app.factory('Auth', ['$firebaseSimpleLogin', '$rootScope', 'FIREBASE_URL', function($firebaseSimpleLogin,  $rootScope, FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseSimpleLogin(ref);

	var Auth = {
		signedIn: function() {
			return auth.user !== null;
		},
		login: function() {
			auth.$login('twitter');
		},
		logout: function() {
			auth.$logout();
		}
	};

	$rootScope.signedIn = function() {
		return Auth.signedIn();
	};

	return Auth;
}])

app.factory('Crowdchat', ['$firebase', 'FIREBASE_URL', function($firebase, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + 'crowdchats');
	var crowdchats = $firebase(ref).$asArray();

	var Crowdchat = {
		all: crowdchats,
		create: function(crowdchat) {
			return crowdchats.$add(crowdchat);
		},
		find: function(crowdchatId) {
			console.log(crowdchats);
			//return 'test';
			//return crowdchats.$getRecord(crowdchatId);
		  if (crowdchatId) {
		  	var chatId = $firebase(ref.child(crowdchatId)).$asObject();
		  	console.log(chatId);
		    return chatId.$id;
		  }
		},
		delete: function(crowdchatId) {
			return crowdchats.$remove(crowdchatId);
		}
	};
	return Crowdchat;

}]);

app.factory('MessagePush', ['$firebase', 'FIREBASE_URL', function($firebase, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + 'messages');
	return $firebase(ref).$asArray();

}]);