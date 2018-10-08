import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Footer from './Footer';
import ContainersAddTodo from '../containers/ContainerAddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const styles = {
  containerFlex: {
    margin: 'auto',
    width: 500,
  },
};
const App = (props) => {
  const { classes } = props;
  return (
    <div className={classes.containerFlex}>
      <ContainersAddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
