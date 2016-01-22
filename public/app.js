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
  return $resource('https://api.parse.com/1/classes/Book/:bookId', {bookId: "@bookId"}, {
    query: {
      method: 'GET',
      headers: {
      'X-Parse-Application-Id': 'JjfvfpGDvmx9etMgv916ittvni3QkdvdXY6ODbEc',
      'X-Parse-REST-API-Key': 'NaebdwatVq5Evg2VPBGhLyOF1moLiHqnCSvUcn72'
    }
    },
    save: {
      method: 'POST',
      headers: {
      'X-Parse-Application-Id': 'JjfvfpGDvmx9etMgv916ittvni3QkdvdXY6ODbEc',
      'X-Parse-REST-API-Key': 'NaebdwatVq5Evg2VPBGhLyOF1moLiHqnCSvUcn72'
    }
    },
    update: { 
      method:'PUT',
      headers: {
      'X-Parse-Application-Id': 'JjfvfpGDvmx9etMgv916ittvni3QkdvdXY6ODbEc',
      'X-Parse-REST-API-Key': 'NaebdwatVq5Evg2VPBGhLyOF1moLiHqnCSvUcn72'
    }
    },
    delete: { 
      method:'DELETE',
      headers: {
      'X-Parse-Application-Id': 'JjfvfpGDvmx9etMgv916ittvni3QkdvdXY6ODbEc',
      'X-Parse-REST-API-Key': 'NaebdwatVq5Evg2VPBGhLyOF1moLiHqnCSvUcn72'
    }
    }
  });
}]);

/////////////////
// CONTROLLERS //
/////////////////

app.controller("BooksIndexCtrl", ["$scope", "Book", function ($scope, Book) {
  Book.query().$promise
    .then(function (data) {
      $scope.allBooks = data.results;
    })
    .catch(function (error) {
      console.log(error);
    });
  $scope.save = function (book) {
    Book.save(book);
  };
}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', 'Book', function ($scope, $routeParams, Book) {
  var bookId = $routeParams.id;
  
  Book.query({where: {"objectId": bookId}}).$promise
    .then(function (data) {
      console.log(data.results[0]);
      $scope.book = data.results[0];
    })
    .catch(function (error) {
      console.log(error);
    });
  
  $scope.delete = function (book) {
    Book.delete({bookId: bookId}, book);
  };

  $scope.update = function (book) {
    Book.update({bookId: bookId}, book);
  };
  
}]);



