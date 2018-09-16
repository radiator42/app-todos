import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import DB_CONFIG from '../config/firebase'
import firebase from 'firebase'
import { addTodo, toggleTodo } from '../actions'
import { connect } from 'react-redux'

firebase.initializeApp(DB_CONFIG);
export const database = firebase.database().ref();


class TodoList extends React.Component {


    componentDidMount() {
        const {dispatch} = this.props;



        database.child('todos').once('value', (snapshot) => {
            console.log(snapshot.val());
            snapshot.val().forEach((todo) => {
                console.log(todo);
                if (todo.completed) {
                    dispatch(addTodo(todo.text + ''));
                    dispatch(toggleTodo(todo.id));
                }else{
                    dispatch(addTodo(todo.text + ''))
                }
            })

        });
    }



    render(){

        const { todos, toggleTodo } = this.props;

        return (
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => toggleTodo(todo.id)}
                />
            )}
        </ul>
        )}
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default connect ()(TodoList)