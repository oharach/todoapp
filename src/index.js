import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import TodoApp from './components/App';

import './state/todoReactions';

ReactDOM.render(<TodoApp />, document.getElementById('root'));
