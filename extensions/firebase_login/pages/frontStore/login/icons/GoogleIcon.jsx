import React from 'react';
import PropTypes from 'prop-types';

function GoogleIcon({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width={width} height={height} rx="9" fill="#BDBDBD"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.9101 9.10225C13.9101 8.78316 13.8815 8.47634 13.8283 8.18179H9.59009V9.92247H12.0119C11.9076 10.485 11.5905 10.9616 11.114 11.2807V12.4097H12.5683C13.4192 11.6263 13.9101 10.4727 13.9101 9.10225Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.59018 13.5C10.8052 13.5 11.8237 13.097 12.5683 12.4097L11.114 11.2807C10.711 11.5507 10.1956 11.7102 9.59018 11.7102C8.41814 11.7102 7.42609 10.9186 7.07223 9.85501H5.56882V11.0209C6.30927 12.4916 7.83109 13.5 9.59018 13.5Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.07223 9.85501C6.98223 9.58501 6.931 9.2967 6.931 9.00011C6.931 8.70352 6.98213 8.41511 7.07213 8.14511V6.9792H5.56872C5.26395 7.5867 5.09009 8.27398 5.09009 9.00011C5.09009 9.72625 5.26404 10.4134 5.56882 11.0209L7.07223 9.85501Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.59018 6.28977C10.2509 6.28977 10.844 6.51682 11.3104 6.96273L12.6011 5.67205C11.8218 4.94591 10.8031 4.5 9.59018 4.5C7.83109 4.5 6.30918 5.50852 5.56872 6.9792L7.07213 8.14511C7.426 7.08147 8.41814 6.28977 9.59018 6.28977Z" fill="white"/>
    </svg>
  );
}

GoogleIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

GoogleIcon.defaultProps = {
  width: 18,
  height: 18
};

export default GoogleIcon;
