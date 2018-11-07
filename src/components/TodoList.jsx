import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Todo from './Todo';
import './images/style.scss';

const styles = {
  container: {
    textAlign: 'center',
  },
  progress: {
    width: '90%',
    height: '20px',
    margin: 'auto',
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
      setImage,
      progress,
    } = this.props;

    const list = todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        setToggleTodo={setToggleTodo}
        setImage={setImage}
      />
    ));
    const circle = isLoading && <CircularProgress />;
    return (
      <div className="paper">
        <List className={classes.container}>
          {list.length ? list : circle}
        </List>
        {progress
          ? (
            <LinearProgress
              className={classes.progress}
              variant="determinate"
              value={progress}
            />
          ) : null
        }
        {error && <p>{error}</p>}
      </div>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  setImage: PropTypes.func.isRequired,
  setToggleTodo: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TodoList);
