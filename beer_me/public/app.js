// Angular App Creation
var app = angular.module('beerMe', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/beer/index.html',
			controller: 'BeerIndexCtrl'
		})
		.when('/beers/:id', {
 			templateUrl: 'templates/beer/show.html',
 			controller: 'BeerShowCtrl'
		});
}]);

app.factory('Beer', ['$resource', function ($resource) {
	return $resource('https://api.parse.com/1/classes/Beers/:id', {id: '@id'}, {
		query: {
			isArray: true,
			headers: {
			'X-Parse-Application-Id': 'qW9zbuzfoZsVP3xjEqL5blx81HKrQlPpF8OUoD7i',
			'X-Parse-REST-API-Key': '8CriHITvGbLS4CV5PiEdwyGmp7jztWniCzQHD8GJ'
			},
			transformResponse: function(data) { return angular.fromJson(data).results; }
		},
		save: {
			headers: {
			'X-Parse-Application-Id': 'qW9zbuzfoZsVP3xjEqL5blx81HKrQlPpF8OUoD7i',
			'X-Parse-REST-API-Key': '8CriHITvGbLS4CV5PiEdwyGmp7jztWniCzQHD8GJ'
			},
			method: 'POST'
		},
		update: { method: 'PUT'}
	});
}]);

app.controller('BeerIndexCtrl', ['$scope', 'Beer', function ($scope, Beer) {
	$scope.beers = Beer.query();

	$scope.addBrewski = function() {
		var beerToSave = {
			'beer_name':$scope.newBeer.beer_name, 
			'brewery':$scope.newBeer.brewery, 
			'delicious':$scope.newBeer.delicious
		};
		Beer.save(beerToSave);
		$scope.beers.push($scope.newBeer);
		$scope.newBeer = {};
		addBeerForm = false;
	};
}]);

app.controller('BeerShowCtrl', ['$scope', 'Beer', '$routeParams', function ($scope, Beer, $routeParams ) {
	var beerId = $routeParams.id;
	Beer.query({where: {'objectId': beerId}},
		function(data) {
			$scope.beer = data.results[0];
			console.log($scope.beer);
		});
	
	$scope.editBrewski = function() {
		var updatedBrewski = {
			'beer_name':$scope.alterBeer.beer_name,
			'brewery':$scope.alterBeer.brewery,
			'delicious':$scope.alterBeer.delicious
		};
		Beer.update({id: beerId}, updatedBrewski, function(data) {
			console.log(data);
		});
	};
}]);