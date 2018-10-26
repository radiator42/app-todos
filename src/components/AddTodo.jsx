import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    flexGrow: 1,
    margin: theme.spacing.unit,
    whiteSpace: 'nowrap',
  },
  input: {
    flexGrow: 2,
    margin: theme.spacing.unit,
  },
});

class AddTodo extends React.Component {
  onClick() {
    const { setNewTodo } = this.props;
    if (!this.input.value) {
      return;
    }

    setNewTodo(this.input.value);
    this.input.focus();
    this.input.value = '';
  }

  render() {
    const { classes, logOut, history } = this.props;
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
          onClick={() => this.onClick()}
        >
          Add Todo
        </Button>
        <div>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Add"
            className={classes.button}
            onClick={() => logOut(history)}
          >
            logOut
          </Button>
        </div>
      </div>
    );
  }
}

AddTodo.propTypes = {
  setNewTodo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(withStyles(styles)(AddTodo));
