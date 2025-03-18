import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  useCheckout,
  useCheckoutDispatch
} from '@components/common/context/checkout';
import NpayLogo from '@evershop/npay/components/frontStore/npay/NpayLogo';

import { _ } from '@evershop/evershop/src/lib/locale/translate';
import RenderIfTrue from '@components/common/RenderIfTrue';

export function Npay({ createOrderAPI, orderId, orderPlaced }) {
  const [error, setError] = useState('');

  React.useEffect(() => {
    const createOrder = async () => {
      const response = await fetch(createOrderAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId
        })
      });
      const data = await response.json();
      if (!response.error) {
        const { approveUrl } = data.data;
        // Redirect to PayPal for payment approval
        window.location.href = approveUrl;
      } else {
        setError(response.error.message);
      }
    };

    if (orderPlaced && orderId) {
      // Call the API to create the order
      createOrder();
    }
  }, [orderPlaced, orderId]);

  return (
    <div>
      {error && <div className="text-critical mb-4">{error}</div>}
      <div className="p-8 text-center border rounded mt-4 border-divider">
        {'주문하기 시 네이버페이 결제화면으로 이동합니다.'}
      </div>
    </div>
  );
}

Npay.propTypes = {
  createOrderAPI: PropTypes.string.isRequired,
  orderId: PropTypes.string,
  orderPlaced: PropTypes.bool.isRequired
};

Npay.defaultProps = {
  orderId: undefined
};

export default function NpayMethod({ createOrderAPI }) {
  const checkout = useCheckout();
  const { placeOrder } = useCheckoutDispatch();
  const { steps, paymentMethods, setPaymentMethods, orderPlaced, orderId } =
    checkout;
  // Get the selected payment method
  const selectedPaymentMethod = paymentMethods
    ? paymentMethods.find((paymentMethod) => paymentMethod.selected)
    : undefined;

  useEffect(() => {
    const selectedPaymentMethod = paymentMethods.find(
      (paymentMethod) => paymentMethod.selected
    );
    if (
      steps.every((step) => step.isCompleted) &&
      selectedPaymentMethod.code === 'npay'
    ) {
      placeOrder();
    }
  }, [steps]);

  return (
    <div>
      <div className="flex justify-start items-center gap-4">
        <RenderIfTrue
          condition={
            !selectedPaymentMethod || selectedPaymentMethod.code !== 'npay'
          }
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPaymentMethods((previous) =>
                previous.map((paymentMethod) => {
                  if (paymentMethod.code === 'npay') {
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
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        </RenderIfTrue>
        <RenderIfTrue
          condition={
            !!selectedPaymentMethod && selectedPaymentMethod.code === 'npay'
          }
        >
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
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </RenderIfTrue>
        <div>
          <NpayLogo width={70} />
        </div>
      </div>
      <div>
        <RenderIfTrue
          condition={
            !!selectedPaymentMethod && selectedPaymentMethod.code === 'npay'
          }
        >
          <div>
            <Npay
              createOrderAPI={createOrderAPI}
              orderPlaced={orderPlaced}
              orderId={orderId}
            />
          </div>
        </RenderIfTrue>
      </div>
    </div>
  );
}

NpayMethod.propTypes = {
  createOrderAPI: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'checkoutPaymentMethodnpay',
  sortOrder: 10
};

export const query = `
  query Query {
    createOrderAPI: url(routeId: "npayCreateOrder")
  }
`;
