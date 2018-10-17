import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Todo from './Todo';
import { MESSAGE_LIST } from '../actions/CONSTANTS';

const styles = {
  container: {
    textAlign: 'center',
  },
};

class TodoList extends React.PureComponent {
  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }


  render() {
    const {
      todos,
      toggleTodos,
      preload,
      classes,
    } = this.props;

    const list = todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        toggleTodos={toggleTodos}
      />
    ));

    const circle = (preload === MESSAGE_LIST.LOADING)
      ? <CircularProgress />
      : (
        <Typography variant="subheading" gutterBottom color="primary">
          {preload}
        </Typography>
      );

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
  toggleTodos: PropTypes.func.isRequired,
  requestData: PropTypes.func.isRequired,
  preload: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TodoList);
