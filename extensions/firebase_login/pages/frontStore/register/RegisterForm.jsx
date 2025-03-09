import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Field } from '@components/common/form/Field';
import { Form } from '@components/common/form/Form';
import './RegisterForm.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Area from '@components/common/Area';
import Button from '@components/common/form/Button';
import {
  OK,
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD
} from '@evershop/evershop/src/lib/util/httpStatus';

export default function RegisterForm({ action, verify, verifyConfirm, homeUrl, loginApi, loginUrl }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [nickname, setNickname] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const signUpAvailable = confirmed && password && password.length > 0 && password == passwordCheck && nickname;

  useEffect(() => {
    console.log(signUpAvailable);
  }, [signUpAvailable])

  const sendEmailVerification = async () => {
    const verifyResponse = await fetch(verify, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });

    const verifyResponseJson = await verifyResponse.json();
    switch (verifyResponse.status) {
      case OK:
        setShowConfirm(true);
        break;
      default:
        console.log('Error');
    }
    
    console.log(verifyResponseJson);
  }

  const confirmEmailVerification = async () => {
    const verifyConfirmResponse = await fetch(verifyConfirm, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });

    const verifyConfirmResponseJson = await verifyConfirmResponse.json();
    switch (verifyConfirmResponse.status) {
      case OK:
        console.log(verifyConfirmResponseJson);
        const { verified } = verifyConfirmResponseJson.data;
        if (verified) {
          setShowConfirm(false);
          setConfirmed(true);
        }
        break;
      default:
        console.log('Error');
    }
    
    console.log(verifyConfirmResponseJson);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="register-form flex justify-center items-center">
        <div className="register-form-inner">
          <h1 className="text-center">{_('Create A New Account')}</h1>
          {error && <div className="text-critical mb-4">{error}</div>}
          <Form
            id="registerForm"
            action={action}
            isJSON
            method="POST"
            onSuccess={async (response) => {
              if (!response.error) {
                // Log the customer in
                const loginResponse = await fetch(loginApi, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email,
                    password
                  })
                });

                const loginResponseJson = await loginResponse.json();
                if (loginResponseJson.error) {
                  setError(loginResponseJson.error.message);
                } else {
                  window.location.href = homeUrl;
                }
              } else {
                setError(response.error.message);
              }
            }}
            btnText={_('SIGN UP')}
          >
            <Area
              id="customerRegisterForm"
              coreComponents={[
                {
                  component: {
                    default: (
                      <div className='firebase__login__email_wrapper'>
                        <div style={{ flexGrow: 1 }}>
                          <Field
                            name="email"
                            type="text"
                            placeholder={_('Email')}
                            validationRules={['notEmpty', 'email']}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <Button title={`인증하기`} onAction={sendEmailVerification} />
                      </div>
                    )
                  },
                  sortOrder: 10
                },
                {
                  component: {
                    default: (
                      showConfirm? (
                        <div className='firebase__login__email_confirm_wrapper'>
                          <div>
                            <h2>{`인증 메일을 보냈습니다. 받은메일함을 확인해 주세요.`}</h2>
                            <h2>{`이메일을 받지 못하셨나요? 다시받기`}</h2>
                          </div>
                          <div className="form-submit-button">
                            <Button title={`확인 완료`} onAction={confirmEmailVerification} />
                          </div>
                        </div>
                      ) : <div />
                    )
                  },
                  sortOrder: 11
                },
                {
                  component: {
                    default: (
                      <Field
                        name="password"
                        type="password"
                        placeholder={_('Password')}
                        validationRules={['notEmpty']}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    )
                  },
                  sortOrder: 20
                },
                {
                  component: {
                    default: (
                      <Field
                        name="password_check"
                        type="password"
                        placeholder={`${_('Password')} 확인`}
                        validationRules={['notEmpty']}
                        onChange={(e) => {
                          setPasswordCheck(e.target.value);
                        }}
                      />
                    )
                  },
                  sortOrder: 30
                },
                {
                  component: {
                    default: (
                      <Field
                        name="full_name"
                        type="text"
                        placeholder={`닉네임`}
                        validationRules={['notEmpty']}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    )
                  },
                  sortOrder: 40
                }
              ]}
            />
          </Form>
          <div className="text-center mt-4">
            <span>
              {_('Already have an account?')}
              <a className="text-interactive" href={loginUrl}>
                {' '}
                {_('Login')}{' '}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  action: PropTypes.string.isRequired,
  homeUrl: PropTypes.string.isRequired,
  loginApi: PropTypes.string.isRequired,
  loginUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    action: url(routeId: "authEmailRegister")
    verify: url(routeId: "authEmailVerify")
    verifyConfirm: url(routeId: "authEmailVerifyConfirm")
    loginApi: url(routeId: "customerLoginJson")
    loginUrl: url(routeId: "login")
  }
`;
