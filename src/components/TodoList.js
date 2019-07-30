import React, { Component } from 'react';
import TodoListItem from './TodoListItem'

export default class TodoList extends Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key         ={item.model.id} 
                      item        ={item} 
                      index       ={index} 
                      removeItem  ={this.props.removeItem} 
                      markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group mb-3"> {items} </ul>
    );
  }
}