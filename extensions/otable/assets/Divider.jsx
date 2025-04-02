
import React from 'react';
import PropTypes from 'prop-types';

function Divider({ backgroundColor, height }) {
  return (
    <div style={{ backgroundColor, height }}/>
  );
}

Divider.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string
};

Divider.defaultProps = {
  height: 1,
  backgroundColor: "#e0e0e0"
};

export default Divider;
