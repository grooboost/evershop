import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function CmsVariableEditForm({ action }) {
  const id = 'cmsVariableForm';
  return (
    <Form
      method="PATCH"
      action={action}
      dataFilter={(formData) => {
        return {
          ...formData,
          data: JSON.stringify(JSON.parse(formData.data)) // 줄바꿈과 탭 제거
        };
      }}
      onError={() => {
        toast.error('Something wrong. Please reload the variable!');
      }}
      onSuccess={(response) => {
        if (response.error) {
          toast.error(
            get(
              response,
              'error.message',
              'Something wrong. Please reload the variable!'
            )
          );
        } else {
          toast.success('Variable saved successfully!');
        }
      }}
      submitBtn={false}
      id={id}
    >
      <Area id={id} noOuter />
    </Form>
  );
}

CmsVariableEditForm.propTypes = {
  action: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    action: url(routeId: "updateCmsVariable", params: [{key: "id", value: getContextValue("cmsVariableUuid")}]),
    gridUrl: url(routeId: "cmsVariableGrid")
  }
`;
