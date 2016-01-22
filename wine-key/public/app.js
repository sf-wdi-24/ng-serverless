Parse.initialize("JRtMGAPLmTepO6hBHI49utGj5hD0ANu19rtLXPiz", "VVP7pXG6raUCStZB1OqDzGEn1EYpulOQqoAlQL89");

// Declare the app

var app = angular.module('wineKeyApp', ['ngRoute', 'ngResource']);

// Routes

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
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

// Factory

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  // alert("yay! it worked");
});


var BookDfd = $q.defer();
var Book = Parse.Object.extend('Book');
var queryBook = new Parse.Query(Book);
queryBook.equalTo('name', 'Angular and Parse Working Together');
queryBook.find().then(function (data) {
  BookDfd.resolve(data);
}, function (error) {
  BookDfd.reject(data);
});
BookDfd.promise
.then(function (book) {
  $scope.currentBook = book;
})
.catch(function (error) {
  //do something with the error
});

// app.factory("Book", ["$resource", function($resource) {
//   return $resource("https://super-crud.herokuapp.com/books/:id", { id: "@_id" }, {
//     query: {
//       isArray: true,
//       transformResponse: function(data) { return angular.fromJson(data).books; }
//     },
//     update: { method: 'PUT' }
//   });
// }]);

// Controllers

app.controller('BooksIndexCtrl', ['$scope', 'Book',
  function($scope, Book) {
    $scope.allBooks = Book.query();

    $scope.saveBook = function() {
      var savedBook = Book.save($scope.newBook);
      $scope.newBookForm = false;
      $scope.allBooks.push(savedBook);
      $scope.newBook = {};
    };

  }
]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', '$location', 'Book', 
  function($scope, $routeParams, $location, Book) {
    var bookId = $routeParams.id;

    book = Book.get({ id: bookId },
      function(data) {
        $scope.book = data;
      },
      function(error) {
        $location.path('/');
      }
    );

    $scope.deleteBook = function () {
      Book.delete({ id: bookId });
      $location.path('/');
    };

    $scope.updateBook = function() {
      Book.update({ id: bookId }, $scope.bookToUpdate,
        function(data) {
          $location.path('/');
        }
      );
    };
  }
]);