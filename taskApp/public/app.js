// Parse.initialize('Yqv0XCcFnJKJ4CPM4NJIbUbnDNyTmG3hp7yiG2vd', 'waa2AraeGOAycfwt0CDCJ1uubKDFdpolgn6NTvDu');

var app = angular.module('taskManager', ['ngRoute', 'ngResource']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tasks/index.html',
      controller: 'taskIndexCtrl'
    });
    // .when('taks/:id', {
    //   templateUrl: 'templates/tasks/show.html',
    //   controller: 'taskShowCtrl'
    // });

}]);
app.factory('Task', ['$resource', function($resource) {
  return $resource('https://api.parse.com/1/classes/Task/:taskId', {taskId: '@taskId'}, {
    query: {
      method: 'GET',
      headers: {
      'X-Parse-Application-Id': 'Yqv0XCcFnJKJ4CPM4NJIbUbnDNyTmG3hp7yiG2vd',
      'X-Parse-REST-API-Key': '7TghBbZOHJbLoWD7eOcxkNRF0DbCkRM2COMm8Bb6'
      }
    },
    save: {
      method: 'POST',
      headers: {
      'X-Parse-Application-Id': 'Yqv0XCcFnJKJ4CPM4NJIbUbnDNyTmG3hp7yiG2vd',
      'X-Parse-REST-API-Key': '7TghBbZOHJbLoWD7eOcxkNRF0DbCkRM2COMm8Bb6'
      }
    },
    update: {
      method: 'PUT',
      headers: {
      'X-Parse-Application-Id': 'Yqv0XCcFnJKJ4CPM4NJIbUbnDNyTmG3hp7yiG2vd',
      'X-Parse-REST-API-Key': '7TghBbZOHJbLoWD7eOcxkNRF0DbCkRM2COMm8Bb6'
      }
    }, 
    delete: {
      method: 'DELETE',
      headers: {
      'X-Parse-Application-Id': 'Yqv0XCcFnJKJ4CPM4NJIbUbnDNyTmG3hp7yiG2vd',
      'X-Parse-REST-API-Key': '7TghBbZOHJbLoWD7eOcxkNRF0DbCkRM2COMm8Bb6'
      }
    }
  });
}]);

app.controller('taskIndexCtrl', ['$scope', 'Task', function($scope, Task) {
  Task.query().$promise
    .then(function(data) {
      $scope.allTasks = data.results;
    })
    .catch(function(error) {
      console.log(error);
    });
    $scope.createTask = function(task) {
      Task.save(task);
    };

    $scope.deleteTask = function(task) {
      Task.delete({id: task.objectId});
    }
    $scope.updateTask = function(task) {
      Task.update(task);
      editTaskForm = false;
    };
}]);

