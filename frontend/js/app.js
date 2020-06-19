// module
const todoApp = angular.module('todoApp', [])

// define controller
todoApp.controller('TodoListController', function TodoListController($scope) {
  $scope.todos = [
    {
      title: 'Ir al mercado'
    },
    {
      title: 'Cortarme el cabello'
    }
  ]
})
