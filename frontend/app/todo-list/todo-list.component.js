angular.module('todoList').component('todoList', {
  template: `
    <ul>
      <li class="todo" ng-repeat="todo in $ctrl.todos">
        <div class="title-todo">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
          />
          <span class="left">{{todo.title}}</span>
        </div>
        <button type="button" class="btn btn-danger">Borrar</button>
      </li>
    </ul>
  `,
  controller: function TodoListController() {
    this.todos = [
      {
        title: 'Ir al mercado'
      },
      {
        title: 'Cortarme el cabello'
      }
    ]
  }
})
