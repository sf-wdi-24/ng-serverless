Parse.initialize("fbs2nfyu4saXgQWdguVH9uIARIUTsyY9FwStg74O", "T0h2e7r1XHghiQbrbw9KMH0ZsDJ20YknvRvvhqd1");
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

var app = angular.module('libraryApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider )  {
  $routeProvider
    .when('/', {
    	// Template home!
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexCtrl'
    })
    .when('/books/:id', {
    	templateUrl: 'templates/books/show.html',
    	controller: 'BooksShowCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

var baseUrl = "https://super-crud.herokuapp.com/books/:id";

app.factory("Book", ["$resource", function($resource){
	return $resource(baseUrl, 
	{id: "@_id" } , {
		query: {
			isArray: true,
			transformResponse: function(data) {
				return angular.fromJson(data).books;
			}
		},
    update: {
      method: 'PUT'
    }
	});
}]);


app.controller('BooksIndexCtrl', ['$scope', 'Book', function ($scope, Book) {
  $scope.allBooks = Book.query();

  $scope.addBook = function(){
    var newBook = Book.save($scope.book);
    $scope.allBooks.push(newBook);
    $scope.book = {};
  };
}]);




app.controller('BooksShowCtrl', ['$scope', '$routeParams', 'Book', '$location', function ($scope, $routeParams, Book, $location) {
  $scope.booksShowTest = 'Connected to BooksShowCtrl';
  var bookId = $routeParams.id;
  var book = Book.get({id: bookId});

  $scope.deleteBook = function(){
    Book.delete({id: bookId});
    $location.path('/');
  };

  $scope.updateBook = function(){
    Book.update({id: bookId}, $scope.bookToEdit,
    function (data) {
      $location.path('/');
    });
  };
  
  $scope.book = book;
}]);