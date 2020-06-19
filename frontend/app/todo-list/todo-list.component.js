angular.module('todoList').component('todoList', {
  template: `
    <header class="header">
      <h1>Tienes <span class="emphasis">{{$ctrl.todos.length}}</span> cosas por hacer</h1>
    </header>
    <section>
      <article>
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
      </article>
    </section>
    <section>
      <article class="add-todo-container">
        <input class="add-todo-input" ng-model="$ctrl.query"/>
        <input class="add-todo-btn" type="submit" value="AGREGAR"/>
      </article>
    </section>
    <p>{{$ctrl.query}}</p>
  `,
  controller: function TodoListController() {
    this.todos = [
      {
        title: 'Ir al mercado'
      }
    ]
    this.query = ''
  }
})
