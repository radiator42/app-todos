import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Todo from './Todo';

const styles = {
  container: {
    textAlign: 'center',
  },
};

class TodoList extends React.Component {
  componentDidMount() {
    const { getTodoList } = this.props;
    getTodoList();
  }

  render() {
    const {
      todos,
      setToggleTodo,
      isLoading,
      classes,
      error,
    } = this.props;


    const list = todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        setToggleTodo={setToggleTodo}
      />
    ));
    const circle = (isLoading)
      ? <CircularProgress /> : error;
    return (
      <Paper elevation={6}>
        <List className={classes.container}>
          {list.length ? list : circle}
        </List>
      </Paper>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  setToggleTodo: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TodoList);
