import React, { Component } from 'react';
import { createTodo, getTodos, updateTodo } from './fetch-utils.js';

export default class TodoPage extends Component {
    state = {
      todos: [], 
      todoTitle: ''
    }

    componentDidMount = async ()=>{
      const todos = await getTodos(this.props.token);
      this.setState({ todos });
    }

    handleSubmit = async e => {
      e.preventDefault(); 
      await createTodo(this.state.todoTitle, this.props.token);
      const todos = await getTodos(this.props.token);
      this.setState({ todos, todoTitle: '' });
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input 
              value={this.state.todoTitle}
              onChange={e => this.setState({ todoTitle: e.target.value })}/>
            <button>Add Todo</button>
          </form>
          <div>
            {this.state.todos.sort((a, b) => a.completed - b.complpeted).map(todo => <div
              onClick={async () => {
                await updateTodo(todo.id, !todo.completed, this.props.token);
                const todos = await getTodos(this.props.token);

                this.setState({ todos });
              }} 
              className={todo.completed ? 'todo completed' : 'todo not-completed'}>
              {todo.todo}
            </div>)}
          </div>
        </div>
      );
    }
}


