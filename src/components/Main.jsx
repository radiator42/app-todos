import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from './Footer';
import ContainersAddTodo from '../containers/ContainerAddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import ContainerImages from '../containers/ContainerImages';


const styles = {
  containerFlex: {
    margin: 'auto',
    maxWidth: 400,
  },
};

function Main({ classes }) {
  return (
    <React.Fragment>
      <div className={classes.containerFlex}>
        <ContainersAddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
      <ContainerImages />
    </React.Fragment>

  );
}

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Main);
