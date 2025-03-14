/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import {
  useCheckoutSteps,
  useCheckoutStepsDispatch
} from '@components/common/context/checkoutSteps';
import { StepContent } from '@evershop/otable/components/frontStore/checkout/checkout/shipment/StepContent';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function ShipmentStep({
  account,
  cart: {
    shippingAddress,
    shippingMethod,
    addShippingMethodApi,
    addShippingAddressApi
  },
  setting: { customerAddressSchema }
}) {
  const steps = useCheckoutSteps();
  const [shipmentInfo, setShipmentInfo] = React.useState({
    address: shippingAddress
  });
  const step = steps.find((e) => e.id === 'shipment') || {};
  const [display, setDisplay] = React.useState(false);
  const { canStepDisplay, addStep } = useCheckoutStepsDispatch();

  React.useEffect(() => {
    addStep({
      id: 'shipment',
      title: _('Shipment'),
      previewTitle: _('Ship to'),
      isCompleted: !!(shippingAddress && shippingMethod),
      preview: shippingAddress
        ? `${shippingAddress.address1}, ${shippingAddress.address2}`
        : '',
      sortOrder: 10,
      editable: true
    });
  }, []);

  React.useEffect(() => {
    setDisplay(canStepDisplay(step, steps));
  });

  if (display === false) {
    return null;
  }

  return (
    <div className="checkout-payment checkout-step">
      <StepContent
        step={step}
        shipmentInfo={shipmentInfo}
        setShipmentInfo={setShipmentInfo}
        addShippingAddressApi={addShippingAddressApi}
        addShippingMethodApi={addShippingMethodApi}
        customerAddressSchema={customerAddressSchema}
        addresses={account?.addresses || []}
      />
    </div>
  );
}

ShipmentStep.propTypes = {
  account: PropTypes.shape({
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        address1: PropTypes.string.isRequired,
        address2: PropTypes.string.isRequired,
        postcode: PropTypes.string.isRequired,
        telephone: PropTypes.string.isRequired,
        isDefault: PropTypes.bool.isRequired
      })
    ).isRequired
  }),
  cart: PropTypes.shape({
    shippingAddress: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
    }),
    shippingMethod: PropTypes.string,
    shippingMethodName: PropTypes.string,
    addShippingMethodApi: PropTypes.string,
    addShippingAddressApi: PropTypes.string
  }).isRequired,
  setting: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    customerAddressSchema: PropTypes.object.isRequired
  }).isRequired
};

ShipmentStep.defaultProps = {
  account: {
    addresses: []
  }
};

export const layout = {
  areaId: 'checkoutSteps',
  sortOrder: 15
};

export const query = `
  query Query {
    account: currentCustomer {
      addresses {
        uuid
        fullName
        address1
        address2
        postcode
        telephone
        isDefault
      }
    }
    cart {
      shippingMethod
      shippingMethodName
      shippingAddress {
        id: cartAddressId
        fullName
        postcode
        telephone
        address1
        address2
      }
      addShippingAddressApi: addAddressApi
      addShippingMethodApi
    }
    setting {
      customerAddressSchema
    }
  }
`;
