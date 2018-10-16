import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  itemList: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
};

function Todo({
  toggleTodos, completed, text, classes, id,
}) {
  return (
    <ListItem className={classes.itemList}>
      <Button
        className={classes.button}
        variant="raised"
        color="secondary"
        value={text}
        onClick={toggleTodos(id, completed)}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      >
        {text}
      </Button>
    </ListItem>
  );
}

Todo.propTypes = {
  toggleTodos: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Todo);
