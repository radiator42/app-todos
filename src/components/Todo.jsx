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
  onClick, completed, text, classes,
}) {
  return (
    <ListItem className={classes.itemList}>
      <Button
        className={classes.button}
        variant="raised"
        color="secondary"
        value={text}
        onClick={onClick}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      >
        {text}
      </Button>
    </ListItem>
  );
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todo);
