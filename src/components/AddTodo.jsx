import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import inputField from './inputField';

const styles = theme => ({
  container: {
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

  },
  button: {
    flexGrow: 1,
    margin: [theme.spacing.unit, '0px'],
    whiteSpace: 'nowrap',
  },
  logout: {
    position: 'absolute',
    right: '1%',
    top: '1%',
  },
  input: {
    flexGrow: 2,
    margin: theme.spacing.unit,
  },
});

class AddTodo extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  onClick(value, formApi) {
    const { setNewTodo } = this.props;

    if (!value.addTodo) {
      return;
    }

    setNewTodo(value.addTodo);
    formApi.change(value, '');
  }

  render() {
    const { classes, logOut, history } = this.props;
    return (
      <div className={classes.container}>

        <Form
          onSubmit={(values, formApi) => this.onClick(values, formApi)}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form}
            >
              <Field
                name="addTodo"
                component={inputField}
                type="text"
                className={classes.input}
                variant="outlined"
                label="Add Todo"
              />
              <Button
                variant="contained"
                color="primary"
                aria-label="Add"
                className={classes.button}
                type="submit"
              >
                Add Todo
              </Button>
            </form>

          )}
        />
        <Button
          variant="contained"
          color="secondary"
          aria-label="Add"
          className={classes.logout}
          onClick={() => logOut(history)}
        >
            logOut
        </Button>
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
