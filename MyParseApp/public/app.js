var app = angular.module("superCrudApp", ["ngRoute", "ngResource"]);


// factory

app.factory("Books", ["$http", function($http) {
	var baseUrl = "https://api.parse.com/1/classes/Book";
    function getParams() {
    	return {
    		headers: {
	         'X-Parse-Application-Id': '927W7TTGno6KNkUCJ7pGh8iHVgXUh7qyL7wnrHfT',
	         'X-Parse-REST-API-Key': '9VJU7EW7WKcu0H2srbwScyX8qJLvNFH4OlrDaEr0'
	    	}
	    };
    }
	return {
		query:function(){
			return $http.get(baseUrl,getParams());
		},
		get:function(id){
			return $http.get(baseUrl+id,getParams());
		},
		create:function(data){
			return $http.post(baseUrl,data,getParams());
		},
		update:function(id,data){
			return $http.put(baseUrl+id,data,getParams());
		},
		delete:function(id){
			return $http.delete(baseUrl+id,getParams());
		}
	};
}]);

// routes

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)  {
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


// controllers

app.controller('BooksIndexCtrl', ['$scope', 'Books', function ($scope, Books) {
  $scope.booksIndexTest = 'Connected to BooksIndexCtrl';
  // $scope.books = Books;
  Books.query().success(function(data) {
  	$scope.allBooks = data.results;
  });

   $scope.addBook = function() {
   		Books.create($scope.newBook);
		// $scope.allBooks.push($scope.newBook);
		// $scope.newBook = {};
	};

	$scope.updateBook = function(bookId) {
		Books.update({bookId: bookId}, $scope.updateBook, function(data) {
			$location.path("/");
		});
	};

  $scope.deleteBook = function(bookId) {
		Books.delete({bookId: bookId});
	};
}]);

app.controller('BooksShowCtrl', ['$scope', function ($scope) {
  $scope.booksShowTest = 'Connected to BooksShowCtrl';
}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', 'Books', function ($scope, $routeParams, Books) {
  var bookId = $routeParams.id;
  $scope.book = Books.get({bookId: bookId});

  	$scope.updateBook = function(bookId) {
		Books.update({bookId: bookId}, $scope.updateBook, function(data) {
			$location.path("/");
		});
	};

  $scope.deleteBook = function(bookId) {console.log("something", bookId);
		Books.delete({bookId: bookId});
	};

}]);