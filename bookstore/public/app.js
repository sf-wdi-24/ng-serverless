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
		$locationProvider
		.html5Mode({
			enabled: true,
			requireBase: false
		});
}]);
// run(function() {
		Parse.initialize("FsOryTqrGlHjga6Tjjdz4jzqCTUnMxM49d4N21dV", "sG5UJ9dsmFWmJL7k2X0kQoZJfEW1dSykcT2mCOPW");
	var Book = Parse.Object.extend('Book');
	// })
app.controller('BooksIndexCtrl', ['$scope', '$q', '$location', function($scope, $q, $location) {
		var BookDfd = $q.defer();
		// var Book = Parse.Object.extend('Book');
		var queryBook = new Parse.Query(Book);
		queryBook.find({
			success: function(results) {
				console.log("sucess", results[0]);
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					console.log(object.get("title"));
				}
				$scope.books = results;
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		$scope.addBook = function() {
			var newBook = new Book();
			newBook.save($scope.newBook, {
				success: function(savedBook) {
					console.log("saved book", savedBook);
					$scope.books.push(savedBook);
					$location.path("/");
				},
				error: function(savedBook, error) {
					console.log("new book not saved: " + error.message);
				}
			});
		};
	}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', '$location', '$q', function($scope, $routeParams, $location, $q) {
	var bookId = $routeParams.id;
	var query = new Parse.Query(Book);
	query.get(bookId, {
	  success: function(foundBook) {
	    $scope.book = foundBook;
	    console.log(foundBook.get("title") + " book is found.");
	    $scope.deleteBook = function() {
				foundBook.destroy({
				  success: function(myObject) {
				  	$location.path("/");
				  },
				  error: function(myObject, error) {
				  }
				});
			};
	  },
	  error: function(foundBook, error) {
	  	console.log(error.message);
	  }
	});
}]);