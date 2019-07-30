import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class TodoListItem extends Component {
  render () {
    var todoClass = this.props.item.model.completed ? 
        "done" : "undone";
    return(
      <li className="list-group-item">
        <div className={todoClass}>
          <FontAwesomeIcon icon={faCheck} onClick={() => this.props.markTodoDone(this.props.item)} className="mr-2" />
          {this.props.item.model.title}
          <button type="button" className="close" onClick={() => this.props.removeItem(this.props.item)}>&times;</button>
        </div>
      </li>     
    );
  }
}