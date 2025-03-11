import PropTypes from 'prop-types';
import React from 'react';
import { CustomerAddressForm } from '@evershop/otable/components/customer/address/addressForm/AddressForm';

export default function Index({
  display,
  address = {},
  formId = 'customerAddressForm',
  areaId = 'customerAddressForm',
  customerAddressSchema,
  onOpenSearch,
  searchedAddress,
}) {
  return (
    <CustomerAddressForm
      display={display}
      address={address}
      formId={formId}
      areaId={areaId}
      customerAddressSchema={customerAddressSchema}
      onOpenSearch={onOpenSearch}
      searchedAddress={searchedAddress}
    />
  );
}

Index.propTypes = {
  display: PropTypes.bool,
  address: PropTypes.shape({
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.shape({
      code: PropTypes.string
    }),
    fullName: PropTypes.string,
    postcode: PropTypes.string,
    province: PropTypes.shape({
      code: PropTypes.string
    }),
    telephone: PropTypes.string
  }),
  areaId: PropTypes.string,
  formId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  customerAddressSchema: PropTypes.object.isRequired,
  onOpenSearch: PropTypes.func.isRequired,
  searchedAddress: PropTypes.any.isRequired
};

Index.defaultProps = {
  display: true,
  address: {},
  areaId: 'customerAddressForm',
  formId: 'customerAddressForm'
};
