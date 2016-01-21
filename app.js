var app = angular.module('libraryApp', ['ngRoute', 'ngResource']);

////////////
// ROUTES //
////////////

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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

/////////////////
// API CALL //
/////////////////

app.factory("Book", ["$resource", function($resource) {
  return $resource('http://super-crud.herokuapp.com/books/:bookId', {bookId: "@bookId"}, {
    query: {
      isArray: true,
      transformResponse: function(data) { return angular.fromJson(data).books; }
    },
    update: { method:'PUT' }
  });
}]);

/////////////////
// CONTROLLERS //
/////////////////

app.controller("BooksIndexCtrl", ["$scope", "Book", function ($scope, Book) {
  $scope.allBooks = Book.query();
  $scope.save = function (book) {
    Book.save(book);
  };
}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', 'Book', function ($scope, $routeParams, Book) {
  var bookId = $routeParams.id;
  $scope.book = Book.get({bookId: bookId});
  
  $scope.deleteBook = Book.get({bookId: bookId});
  Book.delete({bookId: bookId});

  Book.update({bookId: bookId});
}]);



