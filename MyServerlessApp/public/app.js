angular.module('serverlessapp',[]).
directive('n', ['$parse', function($parse){
return {
  restrict: 'E', 
  link: function (scope, element, attrs){
    var getter = $parse('name');
    var setter = getter.assign;
    var context = {name:'angular'};
    var locals = {name:'local'};
    scope.name=getter(context);
    }, 
    template: '{{name}}'

}; 
}]); 





