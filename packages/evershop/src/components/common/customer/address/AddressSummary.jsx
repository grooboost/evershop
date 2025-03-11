/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Area from '@components/common/Area';

export function AddressSummary({ address }) {
  return (
    <Area
      id="addressSummary"
      className="address__summary"
      coreComponents={[
        {
          component: {
            default: ({ fullName }) => (
              <div className="full-name">{fullName}</div>
            )
          },
          props: {
            fullName: address.fullName
          },
          sortOrder: 10,
          id: 'fullName'
        },
        {
          component: {
            default: ({ postcode, address1, address2 }) => (
              <div className="address-one">{`[${postcode}] ${address1} ${address2}`}</div>
            )
          },
          props: {
            postcode: address.postcode,
            address1: address.address1,
            address2: address.address2
          },
          sortOrder: 20,
          id: 'fullAaddress'
        },
        {
          component: {
            default: ({ telephone }) => (
              <div className="telephone">{telephone}</div>
            )
          },
          props: {
            telephone: address.telephone
          },
          sortOrder: 60,
          id: 'telephone'
        }
      ]}
    />
  );
}
