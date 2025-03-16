import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Toggle } from '@components/common/form/fields/Toggle';
import { Card } from '@components/admin/cms/Card';

export default function PgtempPayment({
  setting: {
    pgtempPaymentStatus,
    pgtempDislayName,
    pgtempPublishableKey,
    pgtempSecretKey,
    pgtempEndpointSecret,
    pgtempPaymentMode
  }
}) {
  return (
    <Card title="Pgtemp Payment">
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Enable?</h4>
          </div>
          <div className="col-span-2">
            <Toggle name="pgtempPaymentStatus" value={pgtempPaymentStatus} />
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
              name="pgtempDislayName"
              placeholder="Dislay Name"
              value={pgtempDislayName}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Publishable Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="pgtempPublishableKey"
              placeholder="Publishable Key"
              value={pgtempPublishableKey}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Secret Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="pgtempSecretKey"
              placeholder="Secret Key"
              value={pgtempSecretKey}
            />
          </div>
        </div>
      </Card.Session>
      <Card.Session>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 items-center flex">
            <h4>Webhook Secret Key</h4>
          </div>
          <div className="col-span-2">
            <Field
              type="text"
              name="pgtempEndpointSecret"
              placeholder="Secret Key"
              value={pgtempEndpointSecret}
              instruction="Your webhook url should be: https://yourdomain.com/api/pgtemp/webhook"
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
              name="pgtempPaymentMode"
              placeholder="Payment Mode"
              value={pgtempPaymentMode}
              options={[
                { text: 'Authorize only', value: 'authorizeOnly' },
                { text: 'Capture', value: 'capture' }
              ]}
            />
          </div>
        </div>
      </Card.Session>
    </Card>
  );
}

PgtempPayment.propTypes = {
  setting: PropTypes.shape({
    pgtempPaymentStatus: PropTypes.number,
    pgtempDislayName: PropTypes.string,
    pgtempPublishableKey: PropTypes.string,
    pgtempSecretKey: PropTypes.string,
    pgtempEndpointSecret: PropTypes.string,
    pgtempPaymentMode: PropTypes.string
  }).isRequired
};

export const layout = {
  areaId: 'paymentSetting',
  sortOrder: 100
};

export const query = `
  query Query {
    setting {
      pgtempDislayName
      pgtempPaymentStatus
      pgtempPublishableKey
      pgtempSecretKey
      pgtempEndpointSecret
      pgtempPaymentMode
    }
  }
`;
