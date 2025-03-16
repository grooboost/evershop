import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import {
  useCheckout,
  useCheckoutDispatch
} from '@components/common/context/checkout';
import './CheckoutForm.scss';
import RenderIfTrue from '@components/common/RenderIfTrue';
import Spinner from '@components/common/Spinner';
import { toast } from 'react-toastify';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import TestCards from './TestCards';
import { usePaymentGateway, useElements, PaymentElement } from '@evershop/pgtemp/components/frontStore/pgtemp/checkout/PaymentGateway';

const cartQuery = `
  query Query($cartId: String) {
    cart(id: $cartId) {
      billingAddress {
        cartAddressId
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
      shippingAddress {
        cartAddressId
        fullName
        postcode
        telephone
        country {
          name
          code
        }
        province {
          name
          code
        }
        city
        address1
        address2
      }
      customerEmail
    }
  }
`;

export default function CheckoutForm({
  pgPublishableKey,
  createPgtempPaymentIntentApi,
  returnUrl
}) {
  const [clientSecret, setClientSecret] = React.useState(null);
  const paymentGateway = usePaymentGateway();
  const elements = useElements();

  const [showTestCard, setShowTestCard] = useState('success');
  const { steps, cartId, orderId, orderPlaced, paymentMethods } = useCheckout();
  const { placeOrder, setError } = useCheckoutDispatch();

  const [result] = useQuery({
    query: cartQuery,
    variables: {
      cartId
    },
    pause: orderPlaced === true
  });

  useEffect(() => {
    const pay = async () => {
      const submit = await elements.submit();
      if (submit.error) {
        setError(submit.error.message);
        return;
      }
      // Place the order
      await placeOrder();
    };
    // If all steps are completed, submit the payment
    if (steps.every((step) => step.isCompleted)) {
      pay();
    }
  }, [steps]);

  useEffect(() => {
    if (orderId && orderPlaced) {
      window
        .fetch(createPgtempPaymentIntentApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart_id: cartId, order_id: orderId })
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(_('Some error occurred. Please try again later.'));
          } else {
            setClientSecret(data.data.clientSecret);
          }
        });
    }
  }, [orderId]);

  useEffect(() => {
    const confirmPayment = async () => {
      const billingAddress =
        result.data.cart.billingAddress || result.data.cart.shippingAddress;
      const payload = await paymentGateway.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: billingAddress.fullName,
              email: result.data.cart.customerEmail,
              phone: billingAddress.telephone,
              address: {
                line1: billingAddress.address1,
                country: billingAddress.country.code,
                state: billingAddress.province?.code,
                postal_code: billingAddress.postcode,
                city: billingAddress.city
              }
            }
          },
          return_url: `${returnUrl}?order_id=${orderId}`
        }
      });
      
      if (payload.error) {
        // Get the payment intent ID
        const paymentIntent = payload.error.payment_intent;
        // Redirect to the return URL with the payment intent ID
        window.location.href = `${returnUrl}?order_id=${orderId}&payment_intent=${paymentIntent.id}`;
      }
    };
    if (orderPlaced && clientSecret) {
      confirmPayment();
    }
  }, [orderPlaced, clientSecret]);

  const testSuccess = () => {
    setShowTestCard('success');
  };

  const testFailure = () => {
    setShowTestCard('failure');
  };

  if (result.error) {
    return (
      <div className="flex p-8 justify-center items-center text-critical">
        {result.error.message}
      </div>
    );
  }
  // Check if the selected payment method is Pgtemp
  const pgPaymentMethod = paymentMethods.find(
    (method) => method.code === 'pgtemp' && method.selected === true
  );
  if (!pgPaymentMethod) {
    return null;
  }
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <RenderIfTrue condition={!!(paymentGateway && elements)}>
        <div>
          <div className="pg-form">
            {pgPublishableKey &&
              pgPublishableKey.startsWith('test_') && (
                <TestCards
                  showTestCard={showTestCard}
                  testSuccess={testSuccess}
                  testFailure={testFailure}
                />
              )}
            <PaymentElement id="payment-element" />
          </div>
        </div>
      </RenderIfTrue>
      <RenderIfTrue condition={!!(!paymentGateway || !elements)}>
        <div className="flex justify-center p-5">
          <Spinner width={20} height={20} />
        </div>
      </RenderIfTrue>
    </>
  );
}

CheckoutForm.propTypes = {
  pgPublishableKey: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
  createPgtempPaymentIntentApi: PropTypes.string.isRequired
};
