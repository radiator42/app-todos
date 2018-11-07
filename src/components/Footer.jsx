import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FilterLink from '../containers/FilterLink';
import { FILTERS } from '../CONSTANTS';

const styles = {
  show: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4787ed',
    borderStyle: 'solid',
    padding: '8px 16px',
    color: '#4787ed',
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    fontWeight: 600,

  },
  containers: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
};

function Footer({ classes }) {
  return (
    <div className={classes.containers}>
      <span className={classes.show}>
        Show:
      </span>
      {FILTERS.map(item => (
        <FilterLink
          key={item.label}
          filter={item.value}
        >
          {item.label}
        </FilterLink>
      ))}
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};


export default withStyles(styles)(Footer);
