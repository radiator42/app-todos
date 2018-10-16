import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
// import { addTodo } from '../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2,
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
  onClick = e => {
    const { add } = this.props;
    console.log(add);

    if (!this.input.value) {
      return;
    }

    add(this.input.value);
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
          inputRef={(node) => {
            this.input = node;
          }}
        />
        <Button
          variant="contained"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.onClick}
        >
          Add Todo
        </Button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  add: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AddTodo);
