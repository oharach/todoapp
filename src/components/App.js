import React, { Component } from 'react';
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import store from '../state/store';

/*
Todo app structure

TodoApp
	- TodoHeader
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	- TodoForm
*/

class TodoApp extends Component {

  componentDidMount () {
		var me = this;

		// Here the magic happens. Everytime that the
		// state is updated the app will re-render.
		// A real data driven app.
		store.on('update', function(){
			me.forceUpdate();
		});
	}

  addItem() {
    store.emit('todo:create', store.get().todoInput.trim() );
  }

  removeItem (item) {
    store.emit( 'todo:delete', item );
  }

  markTodoDone(item) {
    store.emit( 'todo:toggle', item );
  }
  
  render() {
    var state = store.get(),
        todos = state.todos;

    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={todos} 
                  removeItem={(item) => this.removeItem(item)} 
                  markTodoDone={(item) => this.markTodoDone(item)}/>
        <TodoForm addItem={() => this.addItem()} />
      </div>
    );
  }
}

export default TodoApp;
