import PropTypes from 'prop-types';
import React from 'react';
import './LoginForm.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Area from '@components/common/Area';

export default function LoginForm({
  action,
  homeUrl,
  registerUrl,
  forgotPasswordUrl
}) {
  const [error, setError] = React.useState(null);

  return (
    <div className="flex justify-center items-center">
      <div className="login-form flex justify-center items-center">
        <div className="login-form-inner">
          <div>
            <h1 className="text-left">{`쉬운 집밥의 시작,\n오디너리테이블`}</h1>
            <h2 className="text-left">{`환영합니다! 함께 만족스러운 식탁 만들어요.`}</h2>
            {error && <div className="text-critical mb-4">{error}</div>}
          </div>
          <Area
            id="loginFormInner"
            coreComponents={[]}
          />
          <div className="text-center mt-4 gap-8 flex justify-center">
            <a href={forgotPasswordUrl}><h2>{`로그인에 문제가 있으신가요?`}</h2></a>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  action: PropTypes.string.isRequired,
  homeUrl: PropTypes.string.isRequired,
  registerUrl: PropTypes.string.isRequired,
  forgotPasswordUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    action: url(routeId: "customerLoginJson")
    registerUrl: url(routeId: "register")
    forgotPasswordUrl: url(routeId: "resetPasswordPage")
  }
`;