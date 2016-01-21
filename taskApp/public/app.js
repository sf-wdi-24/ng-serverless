var app = angular.module('taskManager', ['ngRoute', 'ngResource']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tasks/index.html',
      controller: 'taskIndexCtrl'
    })
    .when('taks/:id', {
      templateUrl: 'templates/tasks/show.html',
      controller: 'taskShowCtrl'
    });
    
}]);
