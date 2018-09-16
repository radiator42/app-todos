import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
import {database} from "../components/TodoList";

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
};

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => {
        const request = database.child('todos').on('value');
    return (diapatch) =>  {
        console.log(dispatch);

        request.then((snap) => {
            console.log(snap.val());
                const map = snap.val().map((togler, index) => {
                    if (index === id) {
                        return {...togler, completed: !togler.completed}

                    }
                    return togler
                });
                database.child('todos/' + id).set(map[id]);
                dispatch(toggleTodo(id))
            })
}}});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
