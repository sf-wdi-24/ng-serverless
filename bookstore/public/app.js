var app = angular.module("superCrudApp", ["ngRoute", "ngResource"]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/books/index.html',
			controller: 'BooksIndexCtrl'
		})
		.when('/books/#/:id', {
			templateUrl: 'templates/books/show.html',
			controller: 'BooksShowCtrl'
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
				console.log("sucess");
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					console.log(object.get("title"));
				}
				$scope.books = results;
				$location.path("/");
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
					$location.path("/#");
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
	    // The object was retrieved successfully.
	    $scope.book = foundBook;
	  },
	  error: function(foundBook, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	  }
	});
}]);