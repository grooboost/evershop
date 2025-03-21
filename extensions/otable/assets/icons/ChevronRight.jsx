
import React from 'react';
import PropTypes from 'prop-types';

function ChevronRight({ width, height, fill }) {
  return (
    <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.393555 1.21275L6.18082 7.00002L0.393555 12.7873L1.6063 14L8.60632 7.00002L1.6063 0L0.393555 1.21275Z" fill={fill}/>
    </svg>
  );
}

ChevronRight.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

ChevronRight.defaultProps = {
  width: 9,
  height: 14,
  fill: "#3a3a3a"
};

export default ChevronRight;
