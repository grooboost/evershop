import PropTypes from 'prop-types';
import React from 'react';

export default function NpayLogo({ width = 100, height = 30 }) {
  return (
    <img
      width={width}
      height={height}
      src="https://developers.pay.naver.com/img/logo/signature/logo_npaygr_small.svg"
      alt="Npay"
      role="presentation"
    />
  );
}

NpayLogo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

NpayLogo.defaultProps = {
  height: 30,
  width: 100
};
