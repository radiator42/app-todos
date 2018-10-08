import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Todo from './Todo';

const styles = theme => ({
  container: {
    textAlign: 'center',
  },
});


class TodoList extends React.PureComponent {
  componentDidMount() {
    const { todos, request } = this.props;
    if (!todos.length || todos == null) {
      request();
    }
  }

  render() {

    const {
      todos, toggleTodos, popUp, classes,
    } = this.props;

    const list = todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodos(todo.id, todos)}
      />
    ));
    
    
    const circle = (popUp === undefined || popUp === 'Данных нету')
      ? (
        <Typography variant="subheading" gutterBottom color="primary">
          {popUp}
        </Typography>
      ) : <CircularProgress />;


    return (
      <Paper elevation="6">
        <List className={classes.container}>
          {list.length ? list : circle}
        </List>
      </Paper>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  toggleTodos: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  popUp: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoList);
