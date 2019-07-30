import store from './store';
import Utils from './utils';

// Wait to emulate a server request.
var lag = 100;

/**
 * Creates a new todo and add it to the list.
 * @param  {String} The todo content.
 */
store.on('todo:create', function( text ){

	// We set the app into a loading status
	// to let the user know
	store.get().set({status: 'loading'});

	// Call the fake server
	setTimeout( function(){
		store.get()
			// Restore the default status for the app and clean
			// the input
			.set( {status: 'ready', todoInput: ''} )

			// Creates the new todo
			.todos.push({
				model: {
					title: text,
					id: Utils.uuid(),
					completed: false
				},
				ui: {
					status: 'ready',
					input: text
				}
			})
		;

		// Save the state in localStorage
		Utils.store('freezerTodos', store.get());
	}, lag);
});

/**
 * Deletes a todo.
 * @param  { FreezerNode } The todo to delete.
 */
store.on('todo:delete', function( todo ){

	// Since we are receiving the todo to delete from
	// the arguments. We can use directly instead of
	// making use of the state.
	var updated = todo.pivot()
						.ui.set({ status: 'deleting' })
	;

	setTimeout( function(){
		// We just remove the todo from the list
		store.get()
			.todos.splice( getTodoIndex( updated ), 1 )
		;

		// Save the state in localStorage
		Utils.store('freezerTodos', store.get());
	}, lag);
});

/**
 * Marks a todo as complete or active.
 * @param {FreezerNode} The todo to toggle.
 */
store.on('todo:toggle', function( todo ){
	todo.model.set({ completed: !todo.model.completed });

	// Save the state in localStorage
	Utils.store('freezerTodos', store.get());
});

/**
 * HELPER function. Find a todo in the state and return
 * its index in the array.
 * @param  {FreezerNode} todo The todo to find.
 * @return {Number|Boolean}   The index or false if not found.
 */
var getTodoIndex = function( todo ){
	var i = 0,
		found = false,
		todos = store.get().todos
	;

	while( i<todos.length && found === false ){
		// Since todos are immutable, we can use
		// direct comparison here instead of using uuid.
		if( todos[i] === todo )
			found = i;
		i++;
	}

	return found;
};
