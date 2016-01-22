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

app.factory("Book", ["$resource", function($resource) {
  return $resource('https://api.parse.com/1/classes/Book/:id', {id: "@id"}, {
    query: {
      method: 'GET',
      headers: {
      'X-Parse-Application-Id': 'caenQnGSYdb6GvHQVEme8tZ879SA8Wv7xDQy3NzM',
      'X-Parse-REST-API-Key': 'bLEQoGlYRhLkWO1fQPu4vszrcipPQHDdsYvUSlGQ'
    }
    },
    save: {
      method: 'POST',
      headers: {
      'X-Parse-Application-Id': 'caenQnGSYdb6GvHQVEme8tZ879SA8Wv7xDQy3NzM',
      'X-Parse-REST-API-Key': 'bLEQoGlYRhLkWO1fQPu4vszrcipPQHDdsYvUSlGQ'
    }
    },
    update: { 
      method:'PUT',
      headers: {
      'X-Parse-Application-Id': 'caenQnGSYdb6GvHQVEme8tZ879SA8Wv7xDQy3NzM',
      'X-Parse-REST-API-Key': 'bLEQoGlYRhLkWO1fQPu4vszrcipPQHDdsYvUSlGQ'
    }
    },
    delete: { 
      method:'DELETE',
      headers: {
      'X-Parse-Application-Id': 'caenQnGSYdb6GvHQVEme8tZ879SA8Wv7xDQy3NzM',
      'X-Parse-REST-API-Key': 'bLEQoGlYRhLkWO1fQPu4vszrcipPQHDdsYvUSlGQ'
    }
    }
  });
}]);

app.controller('BooksIndexCtrl', ['$scope', 'Book', function($scope, Book) {
	$scope.loading = true;
	Book.query().$promise
    .then(function (data) {
      $scope.books = data.results;
      $scope.loading = false;
    })
    .catch(function (error) {
      console.log("Can't show all books because " + error.message);
    });
	$scope.addBook = function() {
		if (!$scope.newBook.image) {
			$scope.newBook.image = "http://gujaratprachar.com/img/placeholder_noImage_bw.png";
		}
		Book.save($scope.newBook).$promise
			.then(function (newBook) {
				console.log("new book is saved");
			})
			.catch(function (error) {
				console.log("new book can't be saved because" + error.message);
			}
		);
		$scope.newBook = {};
	};
}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', '$location', 'Book', function($scope, $routeParams, $location, Book) {
	var bookId = $routeParams.id;
	Book.query({where: {"objectId": bookId}}).$promise
    .then(function (data) {
      $scope.book = data.results[0];
      console.log("found the book title: " + $scope.book.title);
    })
    .catch(function (error) {
      console.log(error);
      $location.path("/");
    });
	$scope.deleteBook = function() {
		Book.delete({id: bookId}, function(data) {
			$location.path("/");
		});
	};
	$scope.editBook = function() {
		Book.update({id: bookId}, $scope.book).$promise
    .then(function (data) {
      console.log("edit the book title: " + data.title);
      $location.path("/");
    })
    .catch(function (error) {
      console.log(error);
    });
	};
}]);