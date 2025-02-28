import React from 'react';
import PropTypes from 'prop-types';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import './FirebaseLogin.scss';
import KakaoIcon from './icons/KakaoIcon';
import AppleIcon from './icons/AppleIcon';
import NaverIcon from './icons/NaverIcon';
import GoogleIcon from './icons/GoogleIcon';
import EmailIcon from './icons/EmailIcon';

function FirebaseLogin({ gauthUrl }) {
  return (
    <div>
      <a href="#" className="firebase__login__button_kakao">
        <KakaoIcon />
        {`카카오로 계속하기`}
      </a>
      <a href="#" className="firebase__login__button">
        <AppleIcon />
        {`Apple로 계속하기`}
      </a>
      <div className='firebase__login__buttons_wrapper'>
        <a href="#" className="firebase__login__button_small">
          <NaverIcon />
          {`네이버`}
        </a>
        <span className="firebase__login__button_small">|</span>
        <a href={gauthUrl} className="firebase__login__button_small">
          <GoogleIcon />
          {`구글`}
        </a>
        <span className="firebase__login__button_small">|</span>
        <a href="#" className="firebase__login__button_small">
          <EmailIcon />
          {`이메일`}
        </a>
      </div>
    </div>
  );
}

FirebaseLogin.propTypes = {
  authUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'loginFormInner',
  sortOrder: 0
};

export const query = `
  query Query {
    gauthUrl: url(routeId: "authGoogle")
  }
`;

export default FirebaseLogin;
