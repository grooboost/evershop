import React from 'react';
import PropTypes from 'prop-types';

function NaverIcon({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width={width} height={height} rx="9" fill="#BDBDBD"/>
    <g clip-path="url(#clip0_881_14293)">
    <path d="M10.7465 9.24617L8.15113 5.5H6V12.5H8.25351V8.75325L10.8489 12.5H13V5.5H10.7465V9.24617Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_881_14293">
    <rect width="7" height="7" fill="white" transform="translate(6 5.5)"/>
    </clipPath>
    </defs>
    </svg>
  );
}

NaverIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

NaverIcon.defaultProps = {
  width: 18,
  height: 18
};

export default NaverIcon;
