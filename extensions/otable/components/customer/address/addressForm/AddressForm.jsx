/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Field } from '@evershop/otable/components/common/form/Field';
import Area from '@components/common/Area';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Button from '@components/common/form/Button';

function isFieldRequired(schema, fieldName) {
  if (schema && Array.isArray(schema.required)) {
    return schema.required.includes(fieldName);
  }

  return false;
}

function getErrorMessage(schema, fieldName, defaultMessage) {
  if (schema && schema.errorMessage) {
    if (schema.errorMessage[fieldName]) {
      return schema.errorMessage[fieldName];
    } else {
      return defaultMessage;
    }
  } else {
    return defaultMessage;
  }
}

export function CustomerAddressForm({
  display,
  address = {},
  formId = 'customerAddressForm',
  areaId = 'customerAddressForm',
  customerAddressSchema,
  onOpenSearch,
  searchedAddress
}) {
  const [name, setName] = useState(address?.fullName || '');
  const [phone, setPhone] = useState(address?.telephone || '');
  const [selectedAddress, setSelectedAddress] = useState(address?.address1 || '');
  const [selectedPostcode, setSelectedPostcode] = useState(address?.postcode || '');

  useEffect(() => {
    if (searchedAddress) {
      const addr =
        searchedAddress.userSelectedType === 'R' ? searchedAddress.roadAddress : searchedAddress.jibunAddress;
      const extraAddr =
        searchedAddress.userSelectedType === 'R' &&
        searchedAddress.apartment === 'Y' &&
        searchedAddress.buildingName
            ? `, ${searchedAddress.buildingName}`
            : '';
      setSelectedAddress(`${addr}${extraAddr}`)
      setSelectedPostcode(searchedAddress.zonecode)
    }
  }, [searchedAddress]);

  return (
    <div style={{ display: display? 'block' : 'none'}}>
      <Area
          id={areaId}
          coreComponents={[
            {
              component: { default: Field },
              props: {
                type: 'text',
                name: 'address[full_name]',
                value: name,
                formId,
                label: '받는분',
                placeholder: '성함',
                validationRules: isFieldRequired(customerAddressSchema, 'full_name')
                  ? [
                      {
                        rule: 'notEmpty',
                        message: getErrorMessage(
                          customerAddressSchema,
                          'full_name',
                          '받는분 성함을 입력해주세요'
                        )
                      }
                    ]
                  : [],
                onChange: (value) => setName(value)
              },
              sortOrder: 10
            },
            {
              component: { default: Field },
              props: {
                type: 'text',
                name: 'address[telephone]',
                value: phone,
                formId,
                placeholder: '연락처',
                validationRules: isFieldRequired(customerAddressSchema, 'telephone')
                  ? [
                      {
                        rule: 'notEmpty',
                        message: getErrorMessage(
                          customerAddressSchema,
                          'telephone',
                          '연락처를 입력해주세요'
                        )
                      }
                    ]
                  : [],
                onChange: (value) => setPhone(value)
              },
              sortOrder: 20
            },
            {
              component: { default: <div style={{margin: '10px 0'}}><Button title={'주소 검색'} onAction={() => onOpenSearch()} /></div> },
              props: {},
              sortOrder: 30
            },
            {
              component: { default: Field },
              props: {
                type: 'text',
                name: 'address[address_1]',
                value: selectedAddress,
                formId,
                label: '배송지',
                placeholder: '주소',
                validationRules: isFieldRequired(customerAddressSchema, 'address_1')
                  ? [
                      {
                        rule: 'notEmpty',
                        message: getErrorMessage(
                          customerAddressSchema,
                          'address_1',
                          '주소를 입력해주세요'
                        )
                      }
                    ]
                  : []
              },
              sortOrder: 40
            },
            {
              component: { default: Field },
              props: {
                type: 'text',
                name: 'address[address_2]',
                value: address?.address2,
                formId,
                placeholder: '상세주소',
                validationRules: isFieldRequired(customerAddressSchema, 'address_2')
                  ? [
                      {
                        rule: 'notEmpty',
                        message: getErrorMessage(
                          customerAddressSchema,
                          'address_2',
                          '상세주소를 입력해주세요'
                        )
                      }
                    ]
                  : []
              },
              sortOrder: 50
            },
            {
              component: { default: Field },
              props: {
                type: 'text',
                name: 'address[postcode]',
                value: selectedPostcode,
                formId,
                placeholder: '우편번호',
                validationRules: isFieldRequired('postcode')
                ? [
                    {
                      rule: 'notEmpty',
                      message: getErrorMessage(
                        'postcode',
                        _('Postcode is required')
                      )
                    }
                  ]
                : []
              },
              sortOrder: 60
            }
          ]}
        />
    </div>
  );
}

CustomerAddressForm.propTypes = {
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
  searchedAddress: PropTypes.any.isRequired,
};

CustomerAddressForm.defaultProps = {
  display: true,
  address: {},
  areaId: 'customerAddressForm',
  formId: 'customerAddressForm'
};
