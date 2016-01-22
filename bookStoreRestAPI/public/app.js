var app = angular.module("superCrudApp", ["ngRoute", "ngResource"]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/books/index.html',
			controller: 'BooksIndexCtrl'
		})
		.when('/books/:id', {
			templateUrl: 'templates/books/show.html',
			controller: 'BooksShowCtrl'
		});
}]);
