import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function Link({ active, children, onClick }) {
  return (
    <Button
      variant="outlined"
      color='primary'
      onClick={onClick}
      disabled={active}
      style={{ marginLeft: '4px' }}
    >
      {children}
    </Button>
  );
}


Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
