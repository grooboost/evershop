import PropTypes from 'prop-types';
import React from 'react';
import smallUnit from 'zero-decimal-currencies';
import { useCheckout } from '@components/common/context/checkout';
import PgtempLogo from '@evershop/pgtemp/components/frontStore/pgtemp/PgtempLogo';
import CheckoutForm from '@evershop/pgtemp/components/frontStore/pgtemp/checkout/CheckoutForm';
import { Elements } from '@evershop/pgtemp/components/frontStore/pgtemp/checkout/PaymentGateway';

function PgtempApp({
  total,
  currency,
  pgtempPublishableKey,
  returnUrl,
  createPgtempPaymentIntentApi,
  pgtempPaymentMode
}) {
  const options = {
    mode: 'payment',
    currency: currency.toLowerCase(),
    amount: Number(smallUnit(total, currency)),
    capture_method:
      pgtempPaymentMode === 'capture' ? 'automatic_async' : 'manual'
  };

  return (
    <div className="pgtemp__app">
      <Elements pgPublishableKey={pgtempPublishableKey} options={options}>
        <CheckoutForm
          pgPublishableKey={pgtempPublishableKey}
          returnUrl={returnUrl}
          createPgtempPaymentIntentApi={createPgtempPaymentIntentApi}
        />
      </Elements>
    </div>
  );
}

PgtempApp.propTypes = {
  pgtempPublishableKey: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
  createPgtempPaymentIntentApi: PropTypes.string.isRequired,
  pgtempPaymentMode: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
};

export default function PgtempMethod({
  setting,
  cart: { grandTotal, currency },
  returnUrl,
  createPgtempPaymentIntentApi
}) {
  const checkout = useCheckout();
  const { paymentMethods, setPaymentMethods } = checkout;
  // Get the selected payment method
  const selectedPaymentMethod = paymentMethods
    ? paymentMethods.find((paymentMethod) => paymentMethod.selected)
    : undefined;

  return (
    <div>
      <div className="flex justify-start items-center gap-4">
        {(!selectedPaymentMethod ||
          selectedPaymentMethod.code !== 'pgtemp') && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPaymentMethods((previous) =>
                previous.map((paymentMethod) => {
                  if (paymentMethod.code === 'pgtemp') {
                    return {
                      ...paymentMethod,
                      selected: true
                    };
                  } else {
                    return {
                      ...paymentMethod,
                      selected: false
                    };
                  }
                })
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-circle"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        )}
        {selectedPaymentMethod && selectedPaymentMethod.code === 'pgtemp' && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2c6ecb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}
        <div>
          <PgtempLogo width={100} />
        </div>
      </div>
      <div>
        {selectedPaymentMethod && selectedPaymentMethod.code === 'pgtemp' && (
          <div className="mt-5">
            <PgtempApp
              total={grandTotal.value}
              currency={currency}
              pgtempPublishableKey={setting.pgtempPublishableKey}
              returnUrl={returnUrl}
              createPgtempPaymentIntentApi={createPgtempPaymentIntentApi}
              pgtempPaymentMode={setting.pgtempPaymentMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

PgtempMethod.propTypes = {
  setting: PropTypes.shape({
    pgtempDislayName: PropTypes.string.isRequired,
    pgtempPublishableKey: PropTypes.string.isRequired,
    pgtempPaymentMode: PropTypes.string.isRequired
  }).isRequired,
  cart: PropTypes.shape({
    grandTotal: PropTypes.shape({
      value: PropTypes.number
    }),
    currency: PropTypes.string
  }).isRequired,
  returnUrl: PropTypes.string.isRequired,
  createPgtempPaymentIntentApi: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'checkoutPaymentMethodpgtemp',
  sortOrder: 10
};

export const query = `
  query Query {
    setting {
      pgtempDislayName
      pgtempPublishableKey
      pgtempPaymentMode
    }
    cart {
      grandTotal {
        value
      }
      currency
    }
    returnUrl: url(routeId: "pgtempReturn")
    createPgtempPaymentIntentApi: url(routeId: "createPgtempPaymentIntent")
  }
`;
