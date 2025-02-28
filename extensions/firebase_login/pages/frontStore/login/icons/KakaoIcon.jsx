import React from 'react';
import PropTypes from 'prop-types';

function KakaoIcon({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_881_14304)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50005 0.533203C4.0815 0.533203 0.5 3.30029 0.5 6.71303C0.5 8.83548 1.88525 10.7065 3.9947 11.8194L3.10715 15.0617C3.02873 15.3482 3.35638 15.5765 3.60798 15.4105L7.49856 12.8428C7.82688 12.8745 8.16054 12.8929 8.50005 12.8929C12.9182 12.8929 16.5 10.126 16.5 6.71303C16.5 3.30029 12.9182 0.533203 8.50005 0.533203" fill="black"/>
      </g>
      <defs>
        <clipPath id="clip0_881_14304">
          <rect width={width} height={height} fill="white" transform="translate(0.5)"/>
        </clipPath>
      </defs>
    </svg>
  );
}

KakaoIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

KakaoIcon.defaultProps = {
  width: 16,
  height: 16
};

export default KakaoIcon;
