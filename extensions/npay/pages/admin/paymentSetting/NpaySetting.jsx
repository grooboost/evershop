import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Toggle } from '@components/common/form/fields/Toggle';
import { Card } from '@components/admin/cms/Card';

export default function NpayPayment({
  setting: {
    npayPaymentStatus,
    npayDislayName,
    npayClientId,
    npayClientSecret,
    npayChainId,
    npayEnvironment,
    npayPaymentIntent
  }
}) {
  return (
    <Card title="Npay Payment">
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Enable?</h4>
          </div>
          <div className="col-span-2">
            <Toggle name="npayPaymentStatus" value={npayPaymentStatus} />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Dislay Name</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="npayDislayName"
              placeholder="Dislay Name"
              value={npayDislayName}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Client ID</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="npayClientId"
              placeholder="Client ID"
              value={npayClientId}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Client Secret</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="npayClientSecret"
              placeholder="Secret Key"
              value={npayClientSecret}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Chain ID</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="npayChainId"
              placeholder="Chain ID"
              value={npayChainId}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Environment</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="radio"
              name="npayEnvironment"
              placeholder="Environment"
              value={npayEnvironment}
              options={[
                {
                  text: 'Sandbox',
                  value: JSON.stringify({
                    base: 'https://dev-pub.apis.naver.com/naverpay-partner/naverpay/payments',
                    approve: 'https://test-m.pay.naver.com/z/payments',
                  })
                },
                {
                  text: 'Live',
                  value: JSON.stringify({
                    base: 'https://pub.apis.naver.com/naverpay-partner/naverpay/payments',
                    approve: 'https://m.pay.naver.com/z/payments',
                  })
                }
              ]}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Payment mode</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="radio"
              name="npayPaymentIntent"
              placeholder="Payment Mode"
              value={npayPaymentIntent}
              options={[
                { text: 'Authorize only', value: 'AUTHORIZE' },
                { text: 'Capture', value: 'CAPTURE' }
              ]}
            />
          </div>
        </div>
      </Card.Session>
    </Card>
  );
}

NpayPayment.propTypes = {
  setting: PropTypes.shape({
    npayPaymentStatus: PropTypes.number,
    npayDislayName: PropTypes.string,
    npayClientId: PropTypes.string,
    npayClientSecret: PropTypes.string,
    npayChainId: PropTypes.string,
    npayEnvironment: PropTypes.string,
    npayPaymentIntent: PropTypes.string
  })
};

NpayPayment.defaultProps = {
  setting: {
    npayPaymentStatus: 0,
    npayDislayName: '',
    npayClientId: '',
    npayClientSecret: '',
    npayChainId: '',
    npayEnvironment: '{}',
    npayPaymentIntent: 'CAPTURE'
  }
};

export const layout = {
  areaId: 'paymentSetting',
  sortOrder: 0
};

export const query = `
  query Query {
    setting {
      npayPaymentStatus
      npayDislayName
      npayClientId
      npayClientSecret
      npayChainId
      npayEnvironment
      npayPaymentIntent
    }
  }
`;
