

import React from 'react';
import PropTypes from 'prop-types';
import { addTodo } from '../actions';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2
  },
  button: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  input: {
    flexGrow: 2,
    margin: theme.spacing.unit,
  },
});

class AddTodo extends React.Component {
  onSubmit = e => {
    const { addInputToTodo } = this.props;

    e.preventDefault();

    if (!this.input.value) {
      return;
    }

    addInputToTodo(this.input.value, addTodo);
    this.input.focus();
    this.input.value = '';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Input
            placeholder="Add Todo"
            className={classes.input}
            inputRef={node => this.input = node}
        />
        <Button
          variant="contained"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.onSubmit}
        >  
          Add Todo
        </Button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  addInputToTodo: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTodo);
