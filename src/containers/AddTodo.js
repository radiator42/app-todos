import React from 'react'
import { connect } from 'react-redux'
import { addTodo, toggleTodo } from '../actions'
import { database } from "./VisibleTodoList";

class AddTodo extends React.Component {




    componentDidMount() {
        const {dispatch} = this.props;

        database.child('todos').once('value', (snapshot) => {
            console.log(snapshot.val());
            snapshot.val().forEach((todo, index) => {
                console.log(todo);
                if (todo.completed) {
                    dispatch(addTodo(todo.text + '', index));
                    dispatch(toggleTodo(todo.id));
                }else{
                    dispatch(addTodo(todo.text + '', index))
                }
            })

        });
    }


    render() {
        let input;
        const {dispatch} = this.props;

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(dispatch => {
                        database.child('todos').once('value', (snap) => {
                            console.log(input.value);
                            const id = snap.val().length;
                            database.child('todos/' + id).set({
                                id: id,
                                text: input.value,
                                completed: false
                            });
                            dispatch(addTodo(input.value, id));
                            input.value = ''
                            }
                        )
                    });

                }}>
                    <input ref={node => input = node} />
                    <button type="submit">
                        Add Todo
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(AddTodo)
