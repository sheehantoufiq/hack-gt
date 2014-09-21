'use strict';

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

app.controller('ChatroomController', ['$scope', '$stateParams', '$firebase', '$ionicScrollDelegate', 'Crowdchat', 'MessagePush', function($scope, $stateParams, $firebase, $ionicScrollDelegate, Crowdchat, MessagePush){
	console.log($stateParams.name);
	var crowdchat = Crowdchat.find($stateParams.name);
	console.log(crowdchat + '1');
	$scope.crowdchats = {
		name: crowdchat
	};

	function toTitleCase(str) {
	  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	var fname = ["huh","murmer","splosh","crackle","squelch","bark","whimper","neigh","trickle","snore","chomp","pitter","snort","glug","ouch","plunk","clang","drip","whizz","beep","wham","moo","purr","squish","howl","gasp","parp","hum","boo","yikes","bawl","eek","boing","dingdong","itch","clank","plop","baa","clink","thwack","belch","ticktock","murmur","meow","clatter","chirp","creak","vroom","wham","slither","whizz","vroom","yikes","clash","sizzle","meow","shush","poof","plonk","snuffle","achoo","gong","hiss","whisper","clatter","thump","hum","fizz","tinkle","whirr","boing","ticktock","honk","jangle","yelp","ugh","screech","thud","snip","munch","cackle","trickle","bark","bam","plop","snort","dingdong","knock","huh","gasp","tweet","ribbit","giggle","cluck","beep","murmur","croak","miaow"];
	var lname = ["dollop","furphy","turgid","euphonium","effluvium","squabble","strudel","hippo","hoipolloi","kerfuffle","wabbit","skedaddle","bungalow","idiopathic","fartlek","kazoo","canoodle","furbelow","graze","morass","bowl","bacon","pluck","gubbins","claptrap","codswallop","floppy","jackanapes","bubbles","argybargy","occiput","snarky","finagle","inedible","allegator","booty","gauze","sickle","topple","rickshaw","hoitytoity","noddle","briefs","glom","maverick","irked","scribble","peduncle","glabella","follicle","turd","ranivorous","bamboo","crapulence","bulbous","hunky","ding","shrubbery","hullabaloo","bladder","canoodle","smashing","hippo","sludge","gallivant","rummage","quibble","bumf","wharf","niggle","bowyang","snarky","turgid","dollop","hocuspocus","ladida","cummerbund","snorkel","rubbish","scruffy","bockamamie","peeve","banana","sag","crudivore","wobble","folderol","lagopodous","inedible","pluck","drizzle","mugwump","termites","petcock","vomitory","doozy","gazump","fillet"];
	var imgNum = [];
	for (var i = 0; i < 47; i++) {
		imgNum[i] = i;
	};

	var username = toTitleCase(fname[Math.round(Math.random()*99)] + " " + lname[Math.round(Math.random()*99)]);
	var avatarImg = String(imgNum[Math.round(Math.random()*47)]);

	$scope.user = username;
	$scope.avatar = avatarImg;
	$scope.messages = MessagePush;

	$scope.message = {
		from: $scope.user, 
		content: "",
		//crowdchat: $scope.crowdchats.name,
		avatar: avatarImg
	};

	$scope.addMessage = function() {
		console.log($scope.message);
		$scope.messages.$add($scope.message);
		$scope.message = {
			from: $scope.user, 
			content: "",
			crowdchat: $scope.crowdchats.name,
			avatar: avatarImg
		};
		$ionicScrollDelegate.scrollBottom();
	}

}]);