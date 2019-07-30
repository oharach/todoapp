import React, { Component } from 'react';
import store from '../state/store';

export default class TodoForm extends Component {
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      store.get().set({ todoInput: newItemValue }).now();
      this.props.addItem();
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={(event) => this.onSubmit(event)} className="form-inline">
        <input type="text" 
               ref="itemName" 
               className="form-control mr-2" 
               placeholder="add a new todo..."
        />
        <button type="submit" className="btn btn-primary">Add</button> 
      </form>
    );   
  }
}