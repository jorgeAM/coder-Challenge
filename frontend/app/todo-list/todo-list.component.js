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
                ng-class="{'disabled-checkbox': todo.done}"
                class="form-check-input"
                type="checkbox"
                value=""
                ng-model="todo.done"
                ng-change="$ctrl.doneTodo(todo._id)"
              />
              <span ng-class="{done: todo.done}" class="left">{{todo.title}}</span>
            </div>
            <button
              type="button"
              class="btn btn-danger"
              ng-click="$ctrl.deleteTodo(todo._id)"
            >
              Borrar
            </button>
          </li>
        </ul>
      </article>
    </section>
    <section>
      <article class="add-todo-container">
        <input class="add-todo-input" ng-model="$ctrl.title"/>
        <input
          class="add-todo-btn"
          type="submit"
          value="AGREGAR"
          ng-click="$ctrl.addTodo()"
        />
      </article>
    </section>
  `,
  controller: function TodoListController($http) {
    this.todos = []
    this.title = ''

    $http.get('http://localhost:9000/api/v1/todo').then(res => {
      this.todos = res.data.todos
    })

    this.addTodo = function addTodo() {
      const title = this.title
      $http.post('http://localhost:9000/api/v1/todo', { title }).then(res => {
        const todo = res.data.todo
        this.todos.push(todo)
      })

      this.title = ''
    }

    this.deleteTodo = function deleteTodo(id) {
      if (!confirm('Are you sure you wanna remove this todo?')) {
        return
      }

      $http.delete(`http://localhost:9000/api/v1/todo/${id}`).then(() => {
        this.todos = this.todos.filter(todo => todo._id !== id)
      })
    }

    this.doneTodo = function doneTodo(id) {
      setTimeout(() => {
        $http
          .put(`http://localhost:9000/api/v1/todo/${id}/complete`)
          .then(() => {
            this.todos = this.todos.filter(todo => todo._id !== id)
          })
      }, 2000)
    }
  }
})
