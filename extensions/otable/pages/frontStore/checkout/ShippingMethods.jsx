import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useClient } from 'urql';
import { useFormContext } from '@components/common/form/Form';
import { AddressFormField } from '@evershop/otable/components/common/form/AddressFormField';
import { useCheckoutStepsDispatch } from '@components/common/context/checkoutSteps';
import { useCheckout } from '@components/common/context/checkout';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

const QUERY = `
  query Query($cartId: String) {
    cart(id: $cartId) {
      shippingAddress {
        id: cartAddressId
        fullName
        postcode
        telephone
        address1
        address2
      }
    }
  }
`;

export default function ShippingMethods({
  getMethodsAPI,
  cart: { addShippingMethodApi },
}) {
  const formContext = useFormContext();
  const { completeStep } = useCheckoutStepsDispatch();
  const [loading, setLoading] = React.useState(false);
  const [addressProvided, setAddressProvided] = React.useState(false);
  const [methods, setMethods] = React.useState([]);
  const { cartId } = useCheckout();
  const client = useClient();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAddressProvided(true);
      axios
        .get(getMethodsAPI)
        .then((response) => {
          setMethods((previous) => {
            const { methods: shippingMethods } = response.data.data;
            return shippingMethods.map((m) => {
              const find = previous.find((p) => p.code === m.code);
              if (find) {
                return { ...find, ...m };
              } else {
                return { ...m, selected: false };
              }
            });
          });
          setLoading(false);
        });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [formContext]);

  React.useEffect(() => {
    async function saveMethods() {
      // Get the selected method
      const selectedMethod = methods.find((m) => m.selected === true);
      try {
        const response = await axios.post(
          addShippingMethodApi,
          {
            method_code: selectedMethod.code,
            method_name: selectedMethod.name
          },
          {
            validateStatus: () => true
          }
        );
        if (!response.data.error) {
          const result = await client
            .query(
              QUERY,
              { cartId },
              {
                requestPolicy: 'network-only'
              }
            )
            .toPromise();
          const address = result.data.cart.shippingAddress;
          await completeStep(
            'shipment',
            `${address.address1}, ${address.address2}`
          );
        } else {
          toast.error(response.data.error.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (formContext.state === 'submitSuccess') {
      saveMethods();
    }
  }, [formContext.state]);

  return (
    <div className="shipping-methods">
      {loading === true && (
        <div className="loading">
          <svg
            style={{
              background: 'rgb(255, 255, 255, 0)',
              display: 'block',
              shapeRendering: 'auto'
            }}
            width="2rem"
            height="2rem"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#f6f6f6"
              strokeWidth="10"
              r="43"
              strokeDasharray="202.63272615654165 69.54424205218055"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              />
            </circle>
          </svg>
        </div>
      )}
      <h4 className="mt-12 mb-4">{_('Shipping Method')}</h4>
      {addressProvided === true && methods.length === 0 && (
        <div className="text-center p-3 border border-divider rounded text-textSubdued">
          {_('Sorry, there is no available method for your address')}
        </div>
      )}
      {addressProvided === false && (
        <div className="text-center p-3 border border-divider rounded text-textSubdued">
          {_('Please enter a shipping address in order to see shipping quotes')}
        </div>
      )}
      {methods.length > 0 && (
        <div className="divide-y border rounded border-divider p-4 mb-8">
          <AddressFormField
            type="radio"
            name="method"
            validationRules={['notEmpty']}
            options={methods.map((m) => ({
              value: m.code,
              text: `${m.name} - ${m.cost}`
            }))}
            onChange={(value) => {
              // Update methods with selected flag
              const newMethods = methods.map((m) => {
                if (m.code === value) {
                  return { ...m, selected: true };
                }
                return { ...m, selected: false };
              });
              setMethods(newMethods);
            }}
          />
        </div>
      )}
    </div>
  );
}

ShippingMethods.propTypes = {
  getMethodsAPI: PropTypes.string.isRequired,
  cart: PropTypes.shape({
    addShippingMethodApi: PropTypes.string.isRequired
  }).isRequired,
};

export const layout = {
  areaId: 'checkoutShippingAddressForm',
  sortOrder: 60
};

export const query = `
  query Query {
    getMethodsAPI: url(routeId: "getSimpleShippingMethods", params: [{ key: "cart_id", value: getContextValue('cart_id') }])
    cart {
      addShippingMethodApi
    }
  }
`;
